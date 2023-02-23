import { useState, useEffect } from 'react'
import apiFetch from '@wordpress/api-fetch';

import styles from './Member.module.scss';

export default function Member({}) {

  /**
   * WordPress API Url
   * ( this should also be configured in the .env.local file )
   */
  const WORDPRESS_URL=process.env.NEXT_PUBLIC_WORDPRESS_URL

  /* Display data on user status */
  let [userStatus, getUserData] = useState({});

  /**
   * Get user details from localStorage obj 
   */
  useEffect(()=> {
    getUserData(localStorage.getItem('user'));
  }, [])

  /* Check if user is logged in */
  if ( userStatus && userStatus.length > 1 ) {
    let userObj = JSON.parse( userStatus )
    /* Get details */
    apiFetch( 
      { path: WORDPRESS_URL + '/wp-json/wp/v2/posts/291' }, 
      { mode: 'no-cors' }, 
      ).then( ( post ) => {
        console.clear();
        console.log( post );
        if ( document.body ) {
          document.getElementById('userObj').innerHTML = post.id
        }
      } 
    );
  }

  /**
   * Return form
   */
  return (
    <>
      <div id="userObj">Loading...</div>
    </>
  )
}
