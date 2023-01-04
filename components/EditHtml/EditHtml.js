import { useState, useEffect } from 'react'

import styles from './EditHtml.module.scss';

/**
 * Edit HTML.
 */
export default function EditHtml( { postId } ) {

  /**
   * WordPress API Url
   * ( this should also be configured in the .env.local file )
   */
  const WORDPRESS_URL=process.env.NEXT_PUBLIC_WORDPRESS_URL

  /**
   * Set user status.
   */
  let [userStatus, getUserData] = useState({});
  let [userStatusJWT, getUserDataJWT] = useState({});

  /**
  * Get user details from localStorage obj. 
  */
  useEffect(()=> {
    getUserData(localStorage.getItem('user'));
  }, [])

  /**
   * Get user JWT details from localStorage obj 
   */
  useEffect(()=> {
    getUserDataJWT(localStorage.getItem('userJWT'))
  }, [])

  /**
   * If user is not logged in, dont display EditHTML options.
   * ( in progress, we need to check whose allowed to use this, etc ... )
   */
  if ( userStatus === null ) {
    return(<></>)
  }

  /* Set default value(s) */
  let editMode = false;

  /* Enable edit mode */
  if ( typeof document !== 'undefined' 
        && document.getElementsByClassName('enableEditHtml')[0] ) {
    document.getElementsByClassName('enableEditHtml')[0].onclick = function(){
      document.designMode = 'on'
      editMode = true
    }
  }

  /* Disable edit mode */
  if ( typeof document !== 'undefined' 
        && document.getElementsByClassName('saveEditHtml')[0] ) {
    document.getElementsByClassName('saveEditHtml')[0].onclick = function(){
      document.designMode = 'off'
    }
  }



  /* Return content */
  return (
    <>
      <div className={styles.editHtmlcontainer}>
        <div className="edit-html">
          <span className={styles.title}>FE Text Editor</span>
          &nbsp;
          <button className="enableEditHtml">Edit</button>
          &nbsp;
          <button className="saveEditHtml">Save</button>
        </div>
      </div>
    </>
  );

}
