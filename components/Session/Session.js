import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from './Session.module.scss';

export default function Session({}) {
  const router = useRouter()
  const logout = ( router.asPath !== '' ) ? decodeURIComponent( router.asPath ).split( '?logout=' )[1] : ''
  
  /**
   * Restricted Pages : Members Only
   * ( if a user isn't logged in, redirect to login page )
   */
  if ( router.asPath.indexOf( '/members' ) !== -1 && typeof localStorage === 'undefined' ) {
    /* Member isnt logged in */
    if ( typeof document !== 'undefined' ) {
      document.getElementsByTagName("body")[0].innerHTML = 'Redirecting...'
      document.location.href = '../login'
    }
  } else if ( router.asPath.indexOf( '/members' ) !== -1 && localStorage.getItem('user') === null ) {
    /* Member isnt logged in */
    if ( typeof document !== 'undefined' ) {
      document.getElementsByTagName("body")[0].innerHTML = 'Redirecting...'
      document.location.href = '../login'
    }
  } else {
    /* We dont need to do anything... */
  }

  /**
   * Logout User
   */
  function logoutUser() {
    if ( typeof localStorage !== 'undefined' && localStorage.getItem('user') !== null ) {
      localStorage.removeItem('user');
      localStorage.removeItem('userJWT');
    }
  }
  let loginStatus = ( logout === 'true' ) ? logoutUser() : true

  /* Display login/logout menus based on user status */
  let [userStatus, getUserData] = useState({});


  /* Show logged out menu as default */
  let userStatusMenu = '<a href="../login">Login</a> | <a href="../register">Register</a>'

  /* Show logged in menu if user is logged in */
  if ( userStatus && userStatus.length > 1 ) {
    const userDetails = JSON.parse(userStatus);
    userStatusMenu = '<a href="../members/dashboard">Dashboard</a> | <a href="?logout=true" id="logout" class="' + styles.wpUserLogoutLink +'">Logout</a>'
                   + '<br />'
                   + 'Welcome ' + userDetails.username              
  }

  /**
   * Get user details from localStorage obj 
   */
  useEffect(()=> {
    getUserData(localStorage.getItem('user'))
  }, [])

  /**
   * Get user details from localStorage obj 
   */
   let [userStatusJWT, getUserDataJWT] = useState({});
   useEffect(()=> {
     getUserDataJWT(localStorage.getItem('userJWT'))
   }, [])

  /**
   * Return user status menu
   */
  return (
    <>
        {userStatusMenu && userStatusMenu.length > 0 && (
          <div className={styles.wpUserStatusMenu}
               dangerouslySetInnerHTML={{ __html: userStatusMenu }}
          />
        )}
    </>
  )
}
