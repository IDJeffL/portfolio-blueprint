
import styles from './Relevanssi.module.scss';

export default function Relevanssi({ searchQuery }) {

  /**
   * Set default values
   */
  let postsPerPage = 5
  let pageCount = 0

  /**
   * Get search results 
   */
  function getSearchResults( pageCount ) {
    /* On init, pageCount will be a str */
    if ( ! Number( pageCount ) ) {
      pageCount = 1
    }

    /* Fetch data */
    fetch( 
      process.env.NEXT_PUBLIC_WORDPRESS_URL 
        + '/wp-json/relevanssi/v1/search?s='
        + document.querySelector( '#search' ).value
        + '&posts_per_page=' + postsPerPage
        + '&page=' + pageCount 
        , {
      method: 'GET',
      cache: 'no-cache'
    })
    .then(res => res.json())
    .then(data => {
      /* Set prev link value */
      let prev = ( pageCount < 1 ) ? 1 : pageCount
      document.getElementById( 'prevSearchResults' ).setAttribute('data-prev', prev - 1 )
      /* Set next link value */
      let next = pageCount
      document.getElementById( 'nextSearchResults' ).setAttribute('data-next', next + 1 )
      /* Display search results */
      displaySearchResults( pageCount, data )
    })
    .catch(error => {
      console.log(error)
    })
  }

  /**
   * User Actions
   * Get first page of search results 
   */
  if ( searchQuery && searchQuery.length >= 3 ) {
    getSearchResults( searchQuery )
  }

  /**
   * Display search results
   */
  function displaySearchResults( pageCount, data ) {

    /* If theres nothing to display */
    if ( data.code ) {
      document.getElementById( 'relevanssiResults' ).innerHTML = 'No results found'
      document.getElementById( 'relevanssiResultsCount' ).innerHTML = ''
      document.getElementById( 'relevanssiResultsNavigation' ).style.display = 'none'
      return
    }

    /* Show/Hide the navigation block */
    if( data[0].data.length >= ( postsPerPage - 1 ) ) {
      document.getElementById( 'relevanssiResultsNavigation' ).style.display = 'inline-block'
    } 

    /* Show both Prev/Next buttons */
    document.getElementById( 'prevSearchResults' ).style.display = 'inline-block'
    document.getElementById( 'prevSearchResults' ).classList.add(styles.prevSearchResults)
    document.getElementById( 'nextSearchResults' ).style.display = 'inline-block'
    document.getElementById( 'nextSearchResults' ).classList.add(styles.nextSearchResults) 

    /* Disable Prev button */
    if ( document.getElementById( 'prevSearchResults' ).getAttribute('data-prev') < 1 ) {
      document.getElementById( 'prevSearchResults' ).classList.add(styles.disableButton)
      document.getElementById( 'prevSearchResults' ).disabled = true;
    }
    else { /* Alls good */
      document.getElementById( 'prevSearchResults' ).classList.remove(styles.disableButton)
      document.getElementById( 'prevSearchResults' ).disabled = false;        
    }   

    /* Disable Next button */
    if ( document.getElementById( 'nextSearchResults' ).getAttribute('data-next') > Math.ceil( data[1].total / postsPerPage ) ) {
      document.getElementById( 'nextSearchResults' ).classList.add(styles.disableButton)
      document.getElementById( 'nextSearchResults' ).disabled = true;
    }
    else { /* Alls good */
      document.getElementById( 'nextSearchResults' ).classList.remove(styles.disableButton)
      document.getElementById( 'nextSearchResults' ).disabled = false;        
    } 

    /* Listen for clicks on the web page */
    document.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      /* If navigation Prev button is clicked */
      if (e.target.matches('#prevSearchResults')) { 
        pageCount = document.getElementById( 'prevSearchResults' ).getAttribute('data-prev')
        getSearchResults( Number( pageCount ) )
        return
      }
      /* If navigation Next button is clicked */
      if (e.target.matches('#nextSearchResults')) {
        pageCount = document.getElementById( 'nextSearchResults' ).getAttribute('data-next')
        getSearchResults( Number( pageCount ) )
        return
      }
    })

    /* Results */
    let results = '<hr />'
    for( let i = 0; i < data[0].data.length; i++ ) {

      /* Featured Image */
      let featuredImage = ( data[0].data[i].yoast_head_json.og_image === undefined )
          ? '<img style="width:100%;" src="no-image.jpg" />' 
          : '<img style="width:100%;" src="' + data[0].data[i].yoast_head_json.og_image[0].url + '" />'

      /* HTML Output */
      results += '<div class="row" data-count="' + data[0].data.length + '">'
              + '<div class="col-3">'
              + featuredImage
              + '</div>'
              + '<div class="col-9">'
              + '<h5>' 
              + data[0].data[i].title.rendered
              + '</h5>'
              + '<p>'
              + data[0].data[i].excerpt.rendered
              + '</p>'
              + '<p class="' + styles.searchResultView + '">'
              + '<a class="' + styles.searchResultViewLink + '" href="' + data[0].data[i].link + '" alt="' + data[0].data[i].title.rendered + '">View</a>'
              + '</p>'
              + '</div>'
              + '<hr />'
              + '</div>'

    }

    /* Set Page count values */
    let startPageResultsCount = ( pageCount === 1 ) ? 1 : ( ( pageCount - 1 ) * postsPerPage ) + 1
    let endPageResultsCount = ( startPageResultsCount + data[0].data.length ) - 1

    /* Display results */
    document.getElementById( 'relevanssiResults' ).innerHTML = results
    document.getElementById( 'relevanssiResultsCount' ).innerHTML = 'Displaying ' + startPageResultsCount + ' - ' + endPageResultsCount + ' of ' + data[1].total + ' results'
  }

  /**
   * Return Search
   */
  return (
    <>

      {/* Search Results Count */}
      <div 
        id="relevanssiResultsCount"
        style={{
          "marginBottom":"20px",
          "fontSize":"10px"
        }}>
        </div>

      {/* Search Results */}
      <div id="relevanssiResults"></div>

      {/* Search Results Navigation */}
      <div id="relevanssiResultsNavigation"
           style={{ 
              "textAlign":"center",
              "width":"100%",
              "display":"none"
           }}>
          <div style={{ 
              "display":"inline-block", 
              "padding":"10px" 
            }}>
            <button 
              id="prevSearchResults" 
              className={styles.prevSearchResults}
              data-prev="0">Prev</button>
          </div>
          <div style={{ 
              "display":"inline-block", 
              "padding":"10px" 
            }}>
            <button 
              id="nextSearchResults" 
              className={styles.nextSearchResults}
              data-next="0">Next</button>
          </div>
      </div>

    </>
  )
}
