import styles from './Reset-password.module.scss';

export default function Lostpassword({ postContent }) {

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
   * WP Register Shortcode 
   * ( if the postContent doesnt include the shortcode for this form, let's exit here )
   */
  let formShortcode = ( postContent.indexOf('[wpResetPasswordForm]') !== -1 ) ? postContent.substring(postContent.search(/\[wpResetPasswordForm\]/),postContent.indexOf("]")+1) : ''
  if ( ! formShortcode.includes( '[wpResetPasswordForm]') ) {
    return ( <></> )
  }

  /**
   * Reset formFields 
   */
  let formFields = ''

  /**
   * Add content formFields to form
   */
   formFields = ''
              + '<form name="wpResetPasswordForm" id="wpResetPasswordForm">'
              + '<div class=' + styles.wpResetPasswordField + '>'
              + '<p>To receive information on how to reset your password enter your email address below.</p>'
              + '<div id="wpResetPasswordFormSubmitted" class="' + styles.wpResetPasswordFormSubmitted + '"></div>'
              + '<div><label for="email" class="">Email</label></div>'
              + '<div class="wpResetPasswordTextFieldTextError"></div>'
              + '<div><input id="email" name="email" type="text" value="" class="email" autocomplete="email"></div>'
              + '<div id="wpResetPasswordSubmitForm" class="' + styles.wpResetPasswordSubmitForm + '">Reset Password</div>'
              + '</div>'
              + '</form>'

  /**
   * Submit Form
   */ 
   if ( typeof document !== 'undefined' ) {

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {

      /* If onclick was to submit gravity form */
      if ( e.target.matches( '#wpResetPasswordSubmitForm' ) ) {

        /* Create new formData obj */
        const formData = new FormData();

        /* Set default formError status */
        let formError = false

        /* Get required form input values */
        const formInputs = document.querySelectorAll('#wpResetPasswordForm input')
        formInputs.forEach( input => {
          /**
           * Text 
           */
          if ( input.type === 'text' ) {
            let textResult = validateField( 'text', document.forms["wpResetPasswordForm"].getElementsByClassName( input.name )[0] )
             /* Oops, no text has been entered in the field */
            if ( textResult === false ) {
              document.getElementsByClassName('wpResetPasswordTextFieldTextError')[0].innerHTML = '<span class="' + styles.wpResetPasswordError + '">Please enter your email address</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('email', document.getElementById(input.name).value)
            }
          }
        });
        
        /* So far so good, now lets send the formData to WP and auth/login the user */
        let passwordUpdate = ( formError === false ) ? resetPassword( formData ) : ''
      }
    });
  }

  /**
   * Validate form fields
   */
  function validateField( objType = '' , obj = '' ) {
    if ( objType === 'text' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('wpResetPasswordTextFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
         return false
      }
      /* Check if valid email address */
      if ( ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( obj.value ) ){
        // return false
      }
    }
  }

  /**
   * Reset password
   */
   function resetPassword( formData ) {
    /* Set url(s) to send formParams to */
    let authUrl  = WORDPRESS_URL + '/?rest_route=/simple-jwt-login/v1/user/reset_password';
    /* Append form data */
    formData.append( 'AUTH_KEY', 'THISISMySpeCiaLAUthCode' )
    /* Send the formParams to Wordpress */
    fetch( authUrl, {
      method: 'POST',
      body: formData
    })
    .then( res => res.json() )
    .then( result => {
      if ( ! result.success ) { /* error */
        document.getElementById('wpResetPasswordFormSubmitted').innerHTML = result.data.message
      } else { /* alls good */
        document.getElementById('wpResetPasswordFormSubmitted').innerHTML = result.message
      }
    })
    .catch(error => {
      console.log( error )
    }) 
  } 

  /**
   * Return form
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
