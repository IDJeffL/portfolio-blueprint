import styles from './Register-form.module.scss';

export default function Registerform({ postContent }) {

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
  let formShortcode = ( postContent.indexOf('[wpRegisterForm]') !== -1 ) ? postContent.substring(postContent.search(/\[wpRegisterForm\]/),postContent.indexOf("]")+1) : ''
  if ( ! formShortcode.includes( '[wpRegisterForm]') ) {
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
              + '<form name="wpRegisterForm" id="wpRegisterForm">'
              + '<div class=' + styles.wpRegisterField + '>'
              + '<div id="wpRegisterFormSubmitted" class="' + styles.wpRegisterFormSubmitted + '"></div>'
              + '<div><label for="register_email" class="">Email</label></div>'
              + '<div class="wpRegisterTextFieldTextError"></div>'
              + '<div><input id="register_email" name="register_email" type="text" value="" class="register_email" autocomplete="email"></div>'
              + '<div><label for="register_password" class="">Password</label></div>'
              + '<div class="wpRegisterPasswordFieldTextError"></div>'
              + '<div><input id="register_password" name="register_password" type="password" value="" class="register_password" autocomplete="new-password"></div>'
              + '<div><label for="confirm_register_password" class="">Confirm Password</label></div>'
              + '<div class="wpRegisterConfirmPasswordFieldTextError"></div>'
              + '<div><input id="confirm_register_password" name="confirm_register_password" type="password" value="" class="register_password" autocomplete="new-password"></div>'
              + '<div id="wpRegisterSubmitForm" class="' + styles.wpRegisterSubmitForm + '">Register</div>'
              + '<div><a href="./login">Login</a> | <a href="./reset-password">Forgot Password</a></div>'
              + '</div>'
              + '</form>'

  /**
   * Submit Form
   */ 
   if ( typeof document !== 'undefined' ) {

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {

      /* If onclick was to submit gravity form */
      if ( e.target.matches( '#wpRegisterSubmitForm' ) ) {

        /* Create new formData obj */
        const formData = new FormData();

        /* Set default formError status */
        let formError = false

        /* Get required form input values */
        const formInputs = document.querySelectorAll('#wpRegisterForm input')
        formInputs.forEach( input => {
          /**
           * Text 
           */
          if ( input.type === 'text' ) {
            let textResult = validateField( 'text', 'email', document.forms["wpRegisterForm"].getElementsByClassName( input.name )[0] )
             /* Oops, no text has been entered in the field */
            if ( textResult === false ) {
              document.getElementsByClassName('wpRegisterTextFieldTextError')[0].innerHTML = '<span class="' + styles.wpRegisterError + '">Please enter your email address</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('email', document.getElementById(input.name).value)
            }
          }
          /**
           * Password 
           */
           if ( input.type === 'password') {
            let passwordResult = validateField( 'password', 'password', document.forms["wpRegisterForm"].getElementsByClassName( input.name )[0] )
            /* Oops, no text has been entered in the field */
            if ( passwordResult === false ) {
              document.getElementsByClassName('wpRegisterPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.wpRegisterError + '">Please enter your password</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('password', document.getElementById(input.name).value)
            }
          }
          /**
           * Confirm Password 
           */
          if ( input.id === 'confirm_register_password' ) {
            document.getElementsByClassName('wpRegisterConfirmPasswordFieldTextError')[0].innerHTML = ''
             /* Oops, no text has been entered in the field */
            if ( document.getElementById( input.id ).value === '' ) {
              document.getElementsByClassName('wpRegisterConfirmPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.wpRegisterError + '">Please confirm your password</span>'
              formError = true
              return
            }
            /* Check if Confirm Password value matches Password value */
            if ( document.getElementById( input.id ).value !== document.getElementById( 'register_password' ).value ) {
              document.getElementsByClassName('wpRegisterConfirmPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.wpRegisterError + '">Password and Confirm Password does not match</span>'
              formError = true
              return
            }
          }
        });
        
        /* So far so good, now lets send the formData to WP and register the user */
        let regUser = ( formError === false ) ? userRegister( formData ) : ''
      }
    });
  }

  /**
   * Validate form fields
   */
  function validateField( objType = '', objId = '', obj = '' ) {
    if ( objType === 'text' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('wpRegisterTextFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
         return false
      }
      /* Check if valid email address */
      if ( ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( obj.value ) ){
        // return false
      }
    }
    if ( objType === 'password' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('wpRegisterPasswordFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
         return false
      }
    }
  }

  /* 
   * Register user 
   */
  function userRegister( formData ) {
    /* Set url(s) to send formParams to */
    let authUrl  = WORDPRESS_URL + '/?rest_route=/simple-jwt-login/v1/users';
    /* Append form data */
    formData.append( 'AUTH_KEY', 'THISISMySpeCiaLAUthCode' )
    /* Send the formParams to Wordpress */
    fetch( authUrl, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json()) 
    .then(result => {
      /* On response, what should we do? */
      if ( result.success ) {
        /* Show login notice */
        document.getElementById( "wpRegisterFormSubmitted" ).innerHTML = '<span>Success, your new account has been registered. <a href="./login">[Login Here]</a></span>'
      } else {
        /* Show error notice */
        document.getElementById( "wpRegisterFormSubmitted" ).innerHTML = '<span>Sorry, ' + result.data.message.toLowerCase() + ' Please try again.</span>'
      }
      /* Reset form */
      document.getElementById( "register_email" ).value = '';
      document.getElementById( "register_password" ).value = '';
      document.getElementById( "confirm_register_password" ).value = '';
    });
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
