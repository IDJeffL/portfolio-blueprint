import styles from './Login-form.module.scss';

export default function LoginForm({ postContent }) {

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
  let formShortcode = ( postContent.indexOf('[wpLoginForm]') !== -1 ) ? postContent.substring(postContent.search(/\[wpLoginForm\]/),postContent.indexOf("]")+1) : ''
  if ( ! formShortcode.includes( '[wpLoginForm]') ) {
    return ( <></> )
  }

  /**
   * Reset formFields 
   */
  let formFields = ''

  /**
   * Add content formFields to form for non-logged in user
   */
  formFields = ''
             + '<form name="wpLoginForm" id="wpLoginForm">'
             + '<div class=' + styles.wpLoginField + '>'
             + '<div id="wpLoginFormSubmitted" class="' + styles.wpLoginFormSubmitted + '"></div>'
             + '<div><label for="email" class="">Email</label></div>'
             + '<div class="wpLoginTextFieldTextError"></div>'
             + '<div><input id="email" name="email" type="text" value="" class="email" autocomplete="email"></div>'
             + '<div><label for="password" class="">Password</label></div>'
             + '<div class="wpLoginPasswordFieldTextError"></div>'
             + '<div><input id="password" name="password" type="password" value="" class="password" autocomplete="password"></div>'
             + '<div id="wpLoginSubmitForm" class="' + styles.wpLoginSubmitForm + '">Login</div>'
             + '<div><a href="./register">Register</a> | <a href="./reset-password">Forgot Password</a></div>'
             + '</div>'
             + '</form>'

  /**
   * Submit Form
   */ 
   if ( typeof document !== 'undefined' ) {

    /* Onclick event */
    document.addEventListener( 'click', function( e ) {

      /* If onclick was to submit gravity form */
      if ( e.target.matches( '#wpLoginSubmitForm' ) ) {

        /* Create new formData obj */
        const formData = new FormData();

        /* Set default formError status */
        let formError = false

        /* Get required form input values */
        const formInputs = document.querySelectorAll('#wpLoginForm input')
        formInputs.forEach( input => {
          /**
           * Text 
           */
          if ( input.type === 'text' ) {
            let textResult = validateField( 'text', document.forms["wpLoginForm"].getElementsByClassName( input.name )[0] )
             /* Oops, no text has been entered in the field */
            if ( textResult === false ) {
              document.getElementsByClassName('wpLoginTextFieldTextError')[0].innerHTML = '<span class="' + styles.wpLoginError + '">Please enter your email address</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('email', document.getElementById(input.name).value)
            }
          }
          /**
           * 
           * Password 
           */
           if ( input.type === 'password' ) {
            let passwordResult = validateField( 'password', document.forms["wpLoginForm"].getElementsByClassName( input.name )[0] )
             /* Oops, no text has been entered in the field */
            if ( passwordResult === false ) {
              document.getElementsByClassName('wpLoginPasswordFieldTextError')[0].innerHTML = '<span class="' + styles.wpLoginError + '">Please enter your password</span>'
              formError = true
            } else { /* Alls good, add form value to formData */
              formData.append('password', document.getElementById(input.name).value)
            }
          }
        });
        
        /* So far so good, now lets send the formData to WP and auth/login the user */
        let loginUser = ( formError === false ) ? authLoginUser( formData ) : ''
      }
    });
  }

  /**
   * Validate form fields
   */
  function validateField( objType = '' , obj = '' ) {
    if ( objType === 'text' && obj.id !== undefined ) {
      /* Reset error */
      document.getElementsByClassName('wpLoginTextFieldTextError')[0].innerHTML = ''
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
      document.getElementsByClassName('wpLoginPasswordFieldTextError')[0].innerHTML = ''
      /* Required field */
      if ( obj.value === '' ) {
         return false
      }
    }
  }

  /**
   * Auth/Login User
   */
   function authLoginUser( formData ) {
    /* Set url(s) to send formParams to */
    let authUrl  = WORDPRESS_URL + '?rest_route=/simple-jwt-login/v1/auth';
    /* Set JWT_token value */
    let jwtToken = ''
    /* Append form data */
    formData.append( 'AUTH_KEY', 'THISISMySpeCiaLAUthCode' )
    /* Send the formParams to Wordpress */
    fetch( authUrl, {
      method: 'POST',
      body: formData
    })
    .then( res => res.json() )
    .then( data => {
      /* On response, what should we do?.. */
      /* Reset formField content */
      document.getElementById('wpLoginFormSubmitted').innerHTML = ''
      /* Unsuccessful auth details */
      if ( ! data.success ) {
        document.getElementById('wpLoginFormSubmitted').innerHTML = data.data.message
        document.getElementById('wpLoginFormSubmitted').style.display = 'block'
        document.getElementById('wpLoginForm').reset() 
      } else {
        /* Successful auth details */
        /* Set JWT Token value */
        jwtToken = ( data.data.jwt ) ? data.data.jwt : ''
        /* Now let's attempt to login the user */
        let loginUrl = WORDPRESS_URL + '?rest_route=/simple-jwt-login/v1/autologin&JWT=' + jwtToken;
        fetch( loginUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then( res => res.json() )
        .then( data => { 
          /* On response, what should we do?.. */
          /* Unsuccessful login */
          if ( data.success !== true ) {
            /* Oops, theres a login error!.. */
          } else {
            /* Success, store data locally */
            localStorage.user = Buffer.from( jwtToken.split('.')[1], 'base64' )
            localStorage.userJWT = Buffer.from( jwtToken )
            /* Reload page ( remove login form ), so we can show user is logged in */
            window.location.href = "/";
          }
        })
        .catch(error => {
          console.log( error )
        })
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
