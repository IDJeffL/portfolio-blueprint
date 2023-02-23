import { selectHttpOptionsAndBodyInternal } from '@apollo/client';
import styles from './GravityForms.module.scss';

export default function GravityForms({ formContent, postContent }) {
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
   * Check each postContent <sections> for classname 'gform_wrapper',
   * replace any WordPress forms with NextJS components for GravityForms.
   */
  let postSections = postContent.replace(/(\r\n|\n|\r|\t)/gm, "").split("</section>");

  function extractText(strToParse, strStart, strFinish){
    // Not working: let result = strToParse.match(strStart + "(.*?)" + strFinish)[1]
    let result = strToParse.match(strStart + "(.*?)" + strFinish)
    return result
  }
  
  let gfFormID = 0, gfFormContainer = '', gfBlockID = '', gfFormObjects = []
  if ( postSections.length > 0 ) {
    for ( let i = 0; i < postSections.length; i++) {
      if ( postSections[i].indexOf('gform_wrapper') !== -1 ) {
        /* FormID */
        gfFormID = extractText( postSections[i].replace("gform_wrapper_",""), "id='", "'")
        /* Block ID */
        gfBlockID = extractText( postSections[i], "block_", "\"")
        /* Remove all WP Form Content from Post to create a form container */
        gfFormContainer = postSections[i].replace(/<script(.*?)<\/script>/gi, '')
                                         .replace(/<form.*<\/form>/, '')
                                         .replace(/<iframe.*<\/iframe>/, '')
                                         .replace(/>\s+</g,'><') 
                                         + '</section>' 
        console.log( ' gfFormContainer: ',  gfFormContainer )                             
        /* Assign form container to array */
        gfFormObjects.push(gfFormContainer);
      }
    }
  }

  /**
   * Replace any WordPress form <sections> content with the gForm data instead,
   */
  for( let i = 0; i < gfFormObjects.length; i++ ) {
    /* Block ID */
    let blockRef = extractText( gfFormObjects[i], "block_", "\"")
    /* Remove Section */
    let regex = new RegExp(`<section id="block_${blockRef}(.*?)<\/section>`, "gi");
    /* Get Gravity Form Id from obj where we want the form to appear */
    gfFormID = extractText( gfFormObjects[i].replace("gform_wrapper_",""), "id='", "'")
    /* Assign the form content where we want to appear in the html obj */
    gfFormObjects[i] = gfFormObjects[i].replace( 
      "<div id='gf_" + gfFormID[1] + "' class='gform_anchor' tabindex='-1'></div>", 
      "<div id='gf_" + gfFormID[1] + "' class='gform_anchor' tabindex='-1'></div>"
      /* Add form content to div */
      + createForm( gfFormID[1], formContent, 1 )
    )
    console.log( 'gfFormObjects[i]: ', gfFormObjects[i] )
    console.log( 'gfFormID: ', gfFormID[1] )
    console.log( 'formContent: ', formContent )
    /* Update postContent to provide the space for the gForm content */
    postContent = postContent.replace(/[\s\t]+/g,' ').replace( regex, gfFormObjects[i] )
  }


  /**
   * Add content formFields to form
   */
  function createForm( gfFormID, formContent) {
    console.log( 'FORM ID: ',  gfFormID )

    /**
     * Set the selected form object
     */
    let formFields = '' 
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
    formContent['gfForm']['formFields'] = selectedForm


    console.log( gfFormID, formContent )

    if ( gfFormID && formContent ) {
      /* Form */
      formFields = formFields + '<div id="gfFormSubmitted'+gfFormID+'" class="' + styles.gfFieldError + '"></div>'
      formFields = formFields + '<form name="gfForm'+gfFormID+'" id="gfForm'+gfFormID+'">'
      if ( formContent.gfForm.formFields.nodes ) {
        formFields = formFields + gfFormStages( formContent.gfForm.formFields.nodes )
        formFields = formFields + '<div id="gfFormErrors'+gfFormID+'" class="' + styles.gfFieldError + ' gfFormErrors'+gfFormID+'"></div>'
        formContent.gfForm.formFields.nodes.map((node) => {
          let formField = ''
          let textRequired = ''
          let fieldRequired = ''
          let description = ''
          switch( node.type ) {
            /* Text */
            case 'TEXT':
              if ( node.isRequired ) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
              }
              if ( ! node.description ) {
                description = ''
              }
              formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                        + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                        + '<div class="gfFieldTextError'+gfFormID+'"></div>'
                        + '<div><input id="input_' + node.id + '" name="input_' + node.id + '" type="' + node.type + '" value="" class="formField input_' + node.id + '" ' + fieldRequired + '></div>'
                        + '<div>' + description + '</div>'
                        + '</div>'
              formFields = formFields + formField
              break
            /* Checkbox */  
            case 'CHECKBOX':
              if ( node.isRequired ) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
              }
              if ( ! node.description ) {
                description = ''
              }
              formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                        + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                        + '<div class="gfFieldCheckboxError'+gfFormID+'"></div>'
                        + createCheckboxField( node, fieldRequired )
                        + '<div>' + description + '</div>'
                        + '</div>'
              formFields = formFields + formField   
              break 
            /* Select */  
            case 'SELECT':
              if ( node.isRequired ) {
                textRequired = '<i>(Required)</i>'
                fieldRequired = 'required'
              }
              if ( ! node.description ) {
                description = ''
              }
              formField = '<div class="' + styles.gfField + ' pageNumber_' + node.pageNumber + '">'
                        + '<div><label for="input_' + node.id + '" class="' + styles.gfFieldLabel + '">' + node.label + ' <span class="' + styles.gfFieldRequired + '">' + textRequired + '</span></label></div>'
                        + '<div class="gfFieldSelectError'+gfFormID+'"></div>'
                        + createSelectField( node, fieldRequired )
                        + '<div>' + description + '</div>'
                        + '</div>'
              formFields = formFields + formField   
              break 
          }
        })
      }
      
      /**
       * Multi-Page options
       */
      if ( gfFormStages( formContent.gfForm.formFields.nodes ) ) {

        /* <<< Prev | Next >>> buttons */
        formFields = formFields + '<div class="' + styles.gfNavForm + '">'
        formFields = formFields + '<div id="gfPrevButton'+gfFormID+'" class="' + styles.gfPrevButton + '" data-gfformid="'+gfFormID+'"><< Prev</div>'
        formFields = formFields + '<div id="gfNextButton'+gfFormID+'" class="' + styles.gfNextButton + '" data-gfformid="'+gfFormID+'">Next >></div>'
        formFields = formFields + '</div>'

        /* On initial page load, show the first pageNumber items only */
        if ( typeof document !== 'undefined' ) {
          setTimeout(function() {
            const i = document.querySelectorAll('[class*="pageNumber_"]');
            i.forEach( input => {
              if ( ! input.attributes.class.value.includes("pageNumber_1") ) {
                for( let j = 0; j < document.getElementsByClassName( input.attributes.class.value ).length; j++) {
                  if ( document.getElementsByClassName( input.attributes.class.value )[j] ) {
                    document.getElementsByClassName( input.attributes.class.value )[j].style.display = 'none'
                  }
                }
              } else {
                document.getElementById( 'gfPrevButton'+gfFormID ).style.visibility = 'hidden'
                document.getElementById( 'gfSubmitForm'+gfFormID ).style.visibility = 'hidden'
                if ( document.getElementsByClassName( 'progressId_1' )[0] ) {
                  document.getElementsByClassName( 'progressId_1' )[0].classList.add( styles.gfActiveProgress )
                }
              }
            })
          }, 0);
        }
      }

      /* Submit button */
      formFields = formFields + '<div id="gfSubmitForm'+gfFormID+'" class="' + styles.gfSubmitForm + '" data-gfformid="'+gfFormID+'">Send</div>'
      formFields = formFields + '</form>'
    }
    return formFields
  }

  /**
   * Progress bar 
   */
  function gfFormStages( contentSections ) {
    let pages = 1
    /* Create default progress notification */
    let progress = '<div class="' + styles.gfProgressNotice + ' progressId_'+pages+'">'
                 + '&nbsp;Section 1&nbsp;'
                 + '</div>'
    /* Loop for all pages */
    if( ! contentSections ) {
      return ''
    }
    for( let i = 0; i < contentSections.length; i++ ) {
      if ( contentSections[i].__typename == 'PageField') {
        pages++
        /* Create progress notification for other pages */
        progress+= ' | '
                 + '<div class="' + styles.gfProgressNotice + ' progressId_'+pages+'">'
                 + '&nbsp;Section '+pages+'&nbsp;'
                 + '</div>'
      }
    }
    /* Set content to return  */
    let content = '<div id="gfFormStages'+gfFormID+'" style="width:100%;text-align:center;">'
                + progress
                + '</div>'
    return ( pages > 1 ) ? content : ''
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
   * Create child SELECT fields for the parent SELECT in the form 
   */
  function createSelectField( node, fieldRequired ) {
    let selectFields = '<select class="' + styles.gfFieldSelect + '" name="input_' + node.id + '" id="input_' + node.id + '" ' + fieldRequired + '>'
    /* Loop for each child select option field */
    for ( let i = 0; i < node.choices.length; i++ ) {
      selectFields += '<option name="input_' + node.id + '_' + (i + 1) + '" id="input_' + node.id + '_' + (i + 1) + '" value="' + node.choices[i].value + '" class="formField input_' + node.id + '"> ' + node.choices[i].text + '</option>'
    }
    return selectFields += '</select>'                     
  }

  /**
   * Validate a form field
   */
  function validateField( gfFormID = '', objType = '' , obj = '' ) {
    if ( objType === 'text' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('gfFieldTextError'+gfFormID)[0].innerHTML = ''
      /* Required field? */
      if ( obj.value === '' ) {
        return false
      }
    }
    if ( objType === 'checkbox' && obj.id !== undefined  ) {
      /* Reset error */
      document.getElementsByClassName('gfFieldCheckboxError'+gfFormID)[0].innerHTML = ''
      /* Required field? */
      if ( obj.checked === false ) {
        return false
      }
    }
    if ( objType === 'select' && obj.id !== undefined  ) {
      /* Reset error */
      document.getElementsByClassName('gfFieldSelectError'+gfFormID)[0].innerHTML = ''
      /* Required field? */
      if ( obj.checked === false ) {
        return false
      }
    }
  }

  /**
   * Validate form fields
   * ( functions when clicking Next >>> or form Submission button )
   */
  function validateFormFields( gfFormID, navId, formData ) {

    /* Set default formError status */
    let formError = false
    /* Reset all error messages */
    if ( document.getElementsByClassName('gfFormErrors'+gfFormID)[0] ) {
      document.getElementsByClassName('gfFormErrors'+gfFormID)[0].innerHTML = ''
    }
    if ( document.getElementsByClassName('gfFieldCheckboxError'+gfFormID)[0] ) {
      document.getElementsByClassName('gfFieldCheckboxError'+gfFormID)[0].innerHTML = ''
    }
    if ( document.getElementsByClassName('gfFieldSelectError'+gfFormID)[0] ) {
      document.getElementsByClassName('gfFieldSelectError'+gfFormID)[0].innerHTML = ''
    }
    /* We only need the form fields for the form page(s) we are viewing */
    let classList = ''
    /* Get required form input values */
    let formInputs = document.querySelectorAll('#gfForm'+gfFormID+' input');
    formInputs.forEach( input => {
      /**
       * Text 
       */
      if ( input.type === 'text' ) {
        classList = document.forms['gfForm'+gfFormID].getElementsByClassName( input.name )[0].parentElement.parentElement.classList
        if ( classList.value.indexOf( 'pageNumber_'+navId ) === -1 ) {
          return 'invalidField'
        }
        /* If this field is not required ( optional ) */
        if ( input.required !== true ) {
          formData.append(input.name, document.forms['gfForm'+gfFormID].getElementsByClassName( input.name )[0].value);
          return
        }
        let textResult = validateField( gfFormID, 'text', document.forms['gfForm'+gfFormID].getElementsByClassName( input.name )[0] )
         /* Oops, no text has been entered in the field */
        if ( textResult === false ) {
          let errorMsg = document.forms['gfForm'+gfFormID].getElementsByClassName( input.name )[0].parentElement.parentElement.getElementsByTagName('label')[0].innerText
          document.getElementsByClassName('gfFormErrors'+gfFormID)[0].innerHTML += '<div class="' + styles.gfFieldError + '">Please enter '+errorMsg+'</div>'
          if ( navId === Number(1) && document.getElementById( 'gfPrevButton'+gfFormID ) ) { /* We dont need the PREV button on Page 1 */
            document.getElementById( 'gfPrevButton'+gfFormID ).style.visibility = 'hidden'
          }
          formError = true
        } else { /* Alls good, add form value to formData */
          formData.append(input.name, document.forms['gfForm'+gfFormID].getElementsByClassName( input.name )[0].value);
        }
      }

      /**
       * Checkbox 
       */
      if ( input.type === 'checkbox' ) {
        /* Set default value */
        let checked = false
        /* Get checkbox parent id */
        let parentCheckbox = input.name.split( '_')
        let parentCheckboxName = parentCheckbox[0] + '_' + parentCheckbox[1]
        classList = document.forms['gfForm'+gfFormID].getElementsByClassName( parentCheckboxName )[0].parentElement.parentElement.parentElement.classList
        if ( classList.value.indexOf( 'pageNumber_'+navId ) === -1 ) {
         return 'invalidField'
        }
        /* If this field is not required ( optional ) */
        if ( input.required !== true ) {
          checked = ( document.getElementById(input.name).checked ) ? input.value : ''
          formData.append(input.name, checked );
          return
        }
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
          document.getElementsByClassName('gfFieldCheckboxError'+gfFormID)[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please check a box (Required)</span>'
          formError = true
        } else { /* Alls good, add form value to formData */
          if ( checkboxResult !== false ) {
            checked = ( document.getElementById(input.name).checked ) ? input.value : ''
            formData.append( input.name, checked );
          }
        }
      }

    });


    /**
     * Select
     */
    let formSelects = document.querySelectorAll('#gfForm'+gfFormID+' select');
    formSelects.forEach( select => {
      classList = document.forms['gfForm'+gfFormID].elements[select.id].parentElement.classList
      if ( classList.value.indexOf( 'pageNumber_'+navId ) === -1 ) {
        return 'invalidField'
      }

       /* If this field is not required ( optional ) */
      if ( select.required !== true  ) {
        formData.append(select.name, document.forms['gfForm'+gfFormID].elements[select.id].value);
        return
      }

      /* If this field is required but has no value */
      if ( select.required === true && ! document.forms['gfForm'+gfFormID].elements[select.id].value ) {
        document.getElementsByClassName('gfFieldSelectError'+gfFormID)[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please select an option (Required)</span>'
        formError = true
      } else {
        /* Alls good, add form value to formData */
        formData.append(select.name, document.forms['gfForm'+gfFormID].elements[select.id].value);
      }

    });

    /* Return form data */
    return ( formError !== true ) ? formData : 'error'
  }

  /**
   * Gravity Form Event Listener
   */ 
  if ( typeof document !== 'undefined' ) {
    /* Set default navId value */
    let navId = 1
    /* Create new formData obj */
    let formData = new FormData();

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {
      let gfFormObj = e.target.id.split('_')
      let gfFormID = gfFormObj[gfFormObj.length-1]

      /* Prevent the onclick event from looping */
      e.stopImmediatePropagation();

      /* If onclick event is for <<< Prev button */
      if ( e.target.matches( '#gfPrevButton'+gfFormID ) ) {
        document.getElementById( 'gfNextButton'+gfFormID ).style.visibility = 'visible'
        document.getElementById( 'gfSubmitForm'+gfFormID ).style.visibility = 'hidden'
        document.getElementsByClassName('gfFormErrors'+gfFormID)[0].innerHTML = ''
        /* Hide current element */
        for( let i = 0; i < document.getElementsByClassName( 'pageNumber_'+navId).length; i++) {
          document.getElementsByClassName( 'pageNumber_'+navId )[i].style.display = 'none'
        }
        /* Update navId value */
        navId--
        /* Display new element(s) */
        for( let i = 0; i < document.getElementsByClassName( 'pageNumber_'+navId).length; i++) {
          document.getElementsByClassName( 'pageNumber_'+navId )[i].style.display = 'block'
          /* Highlight selected progress stage */
          if ( document.getElementsByClassName( 'progressId_'+navId )[i] !== undefined ) {
            document.getElementsByClassName( 'progressId_'+(navId+1) )[i].classList.remove( styles.gfActiveProgress )
            document.getElementsByClassName( 'progressId_'+navId )[i].classList.add( styles.gfActiveProgress )
          }
        }
        /* No previous to display */
        if ( ! document.getElementsByClassName( 'pageNumber_'+ ( navId - 1 ) )[0] ) {
          document.getElementById( 'gfPrevButton'+gfFormID ).style.visibility = 'hidden'
          return
        }
      }

      /* If onclick event is for Next >>> button */
      if ( e.target.matches( '#gfNextButton'+gfFormID ) ) {
        document.getElementById( 'gfPrevButton'+gfFormID ).style.visibility = 'visible'
        document.getElementById( 'gfSubmitForm'+gfFormID ).style.visibility = 'hidden'
        document.getElementsByClassName('gfFormErrors'+gfFormID)[0].innerHTML = ''
        /* Validate form field(s) before moving to next section */
        let confirmFormData = validateFormFields( gfFormID, navId, formData )
        if ( confirmFormData === 'error' || confirmFormData === 'invalidField') {
          return
        }
        /* Hide current element(s) */
        for( let i = 0; i < document.getElementsByClassName( 'pageNumber_'+navId).length; i++) {
          document.getElementsByClassName( 'pageNumber_'+navId )[i].style.display = 'none'
        }
        /* Update navId value */
        navId++
        /* Highlight selected progress */
        for( let i = 0; i < document.getElementsByClassName( 'pageNumber_'+navId).length; i++) {
          document.getElementsByClassName( 'pageNumber_'+navId )[i].style.display = 'block'
          /* Reset current selected progress */
          if ( document.getElementsByClassName( 'progressId_'+(Number(navId)-1) )[i] ) {
            document.getElementsByClassName( 'progressId_'+(Number(navId)-1) )[i].classList.remove( styles.gfActiveProgress )
          }
          /* Highlight new selected progress */
          if ( document.getElementsByClassName( 'progressId_'+Number(navId) )[i] ) {
            document.getElementsByClassName( 'progressId_'+Number(navId) )[i].classList.add( styles.gfActiveProgress )
          }
        }
        /* No Next >>> to display */
        if ( ! document.getElementsByClassName( 'pageNumber_'+ ( navId + 1 ) )[0] ) {
          document.getElementById( 'gfNextButton'+gfFormID ).style.visibility = 'hidden'
          document.getElementById( 'gfSubmitForm'+gfFormID ).style.visibility = 'visible'
        }
      } 
  
      /* If onclick event is for submitting gravity form */
      if ( e.target.matches( '#gform_submit_button_'+gfFormID ) ) {
        /* Validate form field(s) before moving to next section */
        let confirmFormData = validateFormFields( gfFormID, navId, formData )
        if ( confirmFormData === 'error' || confirmFormData === 'invalidField') {
          return
        }

        /* Submit the form to Wordpress db */
        if ( formData !== '' ) {

          /**
           * Validate form contents with Akismet 
           * 
           * Optional: To integrate Akismet in form submission, please
           * refer to the notes/content in the file: components/README.md
           */

          /**
           * Send Gravity Form content to WP
           */
          function sendGravityForm( gfFormID, formData ) {
            /* Prevent data from being sent more than once */
            e.stopImmediatePropagation();
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
              console.log( 'Result: ', result )
              /* Show result */
              document.getElementById('gf_'+gfFormID).innerHTML = result
              document.getElementById('gf_'+gfFormID).style.display = 'block';

              /* Reset all form fields */
              if ( data.is_valid ) {
                document.getElementById('gfForm'+gfFormID).reset()
                document.getElementById('gfForm'+gfFormID).style.display = 'none';
              }
            })
            .catch(error => {
              console.log( error )
            }) 
          } sendGravityForm( gfFormID, formData )
        }
      }
    });
  }

  /**
   * Return the WP Post content and Gravity Form.
   *
   * In the WordPress template we will see a class(es) string as shown below,
   * class="col-md-9 col-lg-8 col-xl-7 col-xxl-6"
   * This code needs to be removed just for now as it resizes the content within the GravityForms...
   */
  return (
    <>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ 
          __html: postContent.replace( /class="col-md-9 col-lg-8 col-xl-7 col-xxl-6"/g, '' )
        }}></div>
    </>
  )
}
