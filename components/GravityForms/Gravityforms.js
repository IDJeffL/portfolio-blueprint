import styles from './Gravityforms.module.scss';

export default function Gravityforms({ formContent, postContent }) {
  if ( ! formContent && ! postContent ) {
    return;
  }

  /**
   * WordPress API Url
   * ( this should also be configured in the .env.local file )
   */
  const WORDPRESS_URL=process.env.NEXT_PUBLIC_WORDPRESS_URL

  /**
   * For Faust Integration, 
   * ( set postContent value ) 
   */
  postContent = postContent.content

  /**
   * Check Post Content
   * If the postContent contains any of these WP Shortcuts, let's exit here.
   */
  if ( postContent.includes('[wpLoginForm]')
    || postContent.includes('[wpRegisterForm]')
    || postContent.includes('[wpResetPasswordForm]')
    || postContent.includes('[wpUpdatePasswordForm]')
    || postContent.includes('[SearchResults]')
  ){ return(<></>) }

  /**
   * Gravity Form Shortcode
   */
  let formShortcode = ( postContent.indexOf('[gfForm id=') !== -1 ) ? postContent.substring(postContent.search(/\[gfForm id=.*?\]/),postContent.indexOf("]")+1) : ''

  /**
   * Get the formId/databaseId from the shortcode 
   * ( so we can get the gfFormID to display )
   */
  let gfFormID = formShortcode.split( 'id=' )
  if ( gfFormID[1] ) {
    gfFormID = gfFormID[1].replace('&#8217;', '').replace('&#8242;', '').replace(']','')
  } else {
    gfFormID = ''
  }

  /**
   * Set the selected form object
   */  
  let selectedForm = ''
  if ( formContent.nodes && formContent.nodes.length > 0 ) {
    for ( let i = 0; i < formContent.nodes.length; i++) {
      if ( Number( formContent.nodes[i].databaseId ) === Number( gfFormID ) ) {
        selectedForm = formContent.nodes[i].formFields
      }
    }
  }
  formContent = ['gfForm']
  formContent['gfForm'] = ['formFields']
  formContent['gfForm']['formFields'] = [selectedForm]

  /**
   * Add content formFields to form
   */
  let formFields = ''
  if ( gfFormID && formContent && formContent.gfForm ) {
    formFields = formFields + '<div id="gfFormSubmitted" class="' + styles.gfFieldError + '"></div>'
    formFields = formFields + '<form name="gfForm" id="gfForm">'
    if ( formContent.gfForm.formFields[0].nodes ) {
      formContent.gfForm.formFields[0].nodes.map((node) => {
        let formField = ''
        let textRequired = ''
        let fieldRequired = ''
        switch( node.type ) {
          case 'TEXT':
            if ( node.isRequired ) {
              textRequired = '<i>(Required)</i>'
              fieldRequired = 'required'
            }
            formField = '<div class=' + styles.gfField + '>'
                      + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                      + '<div class="gfFieldTextError"></div>'
                      + '<div><input id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></div>'
                      + '<div>' + node.description + '</div>'
                      + '</div>'
            formFields = formFields + formField
            break
          case 'CHECKBOX':
            if ( node.isRequired ) {
              textRequired = '<i>(Required)</i>'
              fieldRequired = 'required'
            }
            formField = '<div class=' + styles.gfField + '>'
                      + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                      + '<div class="gfFieldCheckboxError"></div>'
                      + createCheckboxField( node, fieldRequired )
                      + '<div>' + node.description + '</div>'
                      + '</div>'
            formFields = formFields + formField   
            break 
        }
      })
    }
    formFields = formFields + '<div id="gfSubmitForm" class="' + styles.gfSubmitForm + '">Submit</div>'
    formFields = formFields + '</form>'
  }

  /**
   * Create child CHECKBOX fields for the parent CHECKBOX in the form 
   */
  function createCheckboxField( node, fieldRequired ) {
    let checkboxFields = '<ul class="' + styles.gfFieldCheckbox + '">'
    /* Loop for each child checkbox option field */
    for ( let i = 0; i < node.choices.length; i++ ) {
      checkboxFields += '<li><input name="input_' + node.id + '_' + (i + 1) + '" type="checkbox" id="input_' + node.id + '_' + (i + 1) + '" value="' + node.choices[i].value + '" class="formField input_' + node.id + '" ' + fieldRequired + '> ' + node.choices[i].text + '</li>'
    }
    return checkboxFields += '</ul>'                     
  }

  /**
   * Validate form fields
   */
  function validateField( objType = '' , obj = '' ) {
    if ( objType === 'text' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('gfFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
        return false
      }
    }
    if ( objType === 'checkbox' && obj.id !== undefined  ) {
      /* Reset error */
      document.getElementsByClassName('gfFieldCheckboxError')[0].innerHTML = ''
      /* Required field */
      if ( obj.checked === false ) {
        return false
      }
    }
  }

  /**
   * Submit Gravity Form
   */ 
  if ( typeof document !== 'undefined' ) {

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {

      /* If onclick was to submit gravity form */
      if ( e.target.matches( '#gfSubmitForm' ) ) {

        /* Create new formData obj */
        const formData = new FormData();

        /* Set default formError status */
        let formError = false

        /* Get required form input values */
        const formInputs = document.querySelectorAll('#gfForm input');
        formInputs.forEach( input => {
          /**
           * Text 
           */
          if ( input.type === 'text' ) {
            /* If fields are not required, we can exit here */
            if ( input.required !== true ) {
              return
            }
            let textResult = validateField( 'text', document.forms["gfForm"].getElementsByClassName( input.name )[0] )
             /* Oops, no text has been entered in the field */
            if ( textResult === false ) {
              document.getElementsByClassName('gfFieldTextError')[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please enter text</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append(input.name, document.getElementById(input.name).value);
            }
          }
          /**
           * Checkbox 
           */
          if ( input.type === 'checkbox' ) {
            /* If fields are not required, we can exit here */
            if ( input.required !== true ) {
              return
            }
            /* Get checkbox parent id */
            let parentCheckbox = input.name.split( '_')
            let parentCheckboxName = parentCheckbox[0] + '_' + parentCheckbox[1]
            let checkboxResult = validateField( 'checkbox', document.getElementById( input.name ) )
            /* Validate at least one option has been selected */
            let count = 0
            for ( let i = 0; i < document.getElementsByClassName( parentCheckboxName ).length; i++ ) {
              if ( document.getElementsByClassName( parentCheckboxName )[i].checked ) {
                count++
              }
            }
            /* Oops, no required options have been selected */
            if ( count < 1 ) {
              document.getElementsByClassName('gfFieldCheckboxError')[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please check a box</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              if ( checkboxResult !== false ) {
                formData.append( input.name, document.getElementById(input.name).value);
              }
            }
          }
        });

        /* So far so good, now lets send the formData to WP and notify the person on-screen we are submitting the form */
        if ( ! formError ) {

          /**
           * Validate form contents with Akismet 
           * 
           * Optional: To integrate Akismet in form submission, please
           * refer to the notes/content in the file: components/README.md
           */

          /**
           * Send Gravity Form content to WP
           */
          function sendGravityForm( formData ) {
            /* Set Gravity Form url to send formParams to */
            let url = WORDPRESS_URL + '/wp-json/gf/v2/forms/' + gfFormID + '/submissions';
            /* Send the formParams to Wordpress */
            fetch( url, {
              method: 'POST',
              body: formData
            })
            .then( res => res.json() )
            .then( data => {
              /* On response, what should we do? */
              let result = ( ! data.is_valid ) ? data.validation_messages : data.confirmation_message;
              document.getElementById('gfFormSubmitted').innerHTML = result
              document.getElementById('gfFormSubmitted').style.display = 'block';
              /* Reset all form fields */
              if ( data.is_valid ) {
                document.getElementById('gfForm').reset() 
              }
            })
            .catch(error => {
              console.log( error )
            }) 
          } sendGravityForm( formData )
       
        }
      }
    });
  }

  /**
   * Return the WP Post content and Gravity Form.
   */
  return (
    <>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: postContent.replace(formShortcode, formFields) }}
        />
    </>
  )
}
