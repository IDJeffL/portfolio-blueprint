import styles from './Update-password.module.scss';

export default function Updatepassword({ postContent }) {

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
  let formShortcode = ( postContent.indexOf('[wpUpdatePasswordForm]') !== -1 ) ? postContent.substring(postContent.search(/\[wpUpdatePasswordForm\]/),postContent.indexOf("]")+1) : ''
  if ( ! formShortcode.includes( '[wpUpdatePasswordForm]') ) {
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
              + '<form name="wpUpdatePasswordForm" id="wpUpdatePasswordForm">'
              + '<div class=' + styles.wpUpdatePasswordField + '>'
              + '<div id="wpUpdatePasswordFormSubmitted" class="' + styles.wpUpdatePasswordFormSubmitted + '"></div>'
              + '<div><label for="new-password" class="">New Password</label></div>'
              + '<div class="wpUpdatePasswordFieldTextError"></div>'
              + '<div><input id="new-password" name="new-password" type="password" value="" class="email" autocomplete="new-password"></div>'
              + '<div><label for="confirm-password" class="">Confirm New Password</label></div>'
              + '<div class="wpUpdateConfirmPasswordFieldTextError"></div>'
              + '<div><input id="confirm-new-password" name="confirm-new-password" type="password" value="" class="email" autocomplete="confirm-new-password"></div>'
              + '<div id="wpUpdatePasswordSubmitForm" class="' + styles.wpUpdatePasswordSubmitForm + '">Update Password</div>'
              + '</div>'
              + '</form>'

  /**
   * Submit Form
   */ 
   if ( typeof document !== 'undefined' ) {

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {

      /* If onclick was to submit gravity form */
      if ( e.target.matches( '#wpUpdatePasswordSubmitForm' ) ) {

        /* Create new formData obj */
        const formData = new FormData();

        /* Set default formError status */
        let formError = false

        /* Get required form input values */
        const formInputs = document.querySelectorAll('#wpUpdatePasswordForm input')
        formInputs.forEach( input => {
          /**
           * Password 
           */
           if ( input.id === 'new-password') {
            document.getElementsByClassName('wpUpdatePasswordFieldTextError')[0].innerHTML = ''
            /* Oops, no text has been entered in the field */
            if ( ! input.value ) {
              document.getElementsByClassName('wpUpdatePasswordFieldTextError')[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please enter your new password</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('new_password', document.getElementById(input.name).value)
            }
          }
          /**
           * Confirm Password 
           */
          if ( input.id === 'confirm-new-password' ) {
            document.getElementsByClassName('wpUpdateConfirmPasswordFieldTextError')[0].innerHTML = ''
            /* Oops, no text has been entered in the field */
            if ( document.getElementById( input.id ).value === '' ) {
              document.getElementsByClassName('wpUpdateConfirmPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.gfFieldError + '">Please confirm your new password</span>'
              formError = true
              return
            }
            /* Check if Confirm Password value matches Password value */
            if ( document.getElementById( 'confirm-new-password' ).value !== document.getElementById( 'new-password' ).value ) {
              document.getElementsByClassName('wpUpdateConfirmPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.gfFieldError + '">New Password and Confirm New Password does not match</span>'
              formError = true
              return
            }
          }
        });
        
        /* So far so good, now lets send the formData to WP and auth/login the user */
        let passwordUpdate = ( formError === false ) ? updatePassword( formData ) : ''
      }
    });
  }

  /**
   * Validate form fields
   */
  function validateField( objType = '' , obj = '' ) {
    if ( objType === 'password' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('wpUpdatePasswordFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
         return false
      }
    }
  }

  /**
   * Update password
   */
   function updatePassword( formData ) {
    /* Set url(s) to send formParams to */
    let authUrl  = WORDPRESS_URL + '/?rest_route=/simple-jwt-login/v1/user/reset_password';
    /* Get URL params */
    let params = new URLSearchParams( location.search )
    /* Append form data */
    formData.append( 'email', params.get( 'username' ) )
    formData.append( 'code', params.get( 'code' ) )
    formData.append( 'AUTH_KEY', 'THISISMySpeCiaLAUthCode' )
    /* Send the formParams to Wordpress */
    fetch( authUrl, {
      method: 'PUT',
      body: formData
    })
    .then( res => res.json() )
    .then( result => {
      if ( ! result.success ) { /* error */
        document.getElementById('wpUpdatePasswordFormSubmitted').innerHTML = result.data.message
      } else { /* alls good */
        document.getElementById('wpUpdatePasswordFormSubmitted').innerHTML = result.message
        /* Reset fields */
        document.getElementById('new-password').value = ''
        document.getElementById('confirm-new-password').value = ''
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
