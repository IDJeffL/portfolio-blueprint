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
