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
  
  /* Options */
  if ( typeof document !== 'undefined' ) {
    document.addEventListener('click', function(e) {

      /* Set update array */
      let postUpdates = []

      /* Disable/Save */
      if ( e.target.className === 'saveEditHtml' && editMode === true ) {
        let editSections = document.querySelectorAll('[class*="editHtmlOn"]');

        for( let i = 0; i < editSections.length; i++ ) {
          /* Remove editing styling effects */
          editSections[i].removeAttribute('style')

          /* Add object value to array for updating */
          postUpdates.push( editSections[i].outerHTML )
        } 

        /*
         * Send to WP via REST API
         */
        const apiURL = WORDPRESS_URL + '/wp-json/fe-text-editor/v1/posts/' + postId + '?jwt=' + userStatusJWT
        const response = fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(postUpdates)
            })

        /* Edit mode false */
        editMode = false

        /* Exit here ... */
        return
      } 

      /* Highlite edit fields */
      if ( e.target.className === 'enableEditHtml' && editMode === false ) {
        let section = document.querySelectorAll('[class*="editHtmlOn"]');
        for( let i = 0; i < section.length; i++ ) {
          section[i].style.border = '1px solid green'
        } 
      }

    }, false);  
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
