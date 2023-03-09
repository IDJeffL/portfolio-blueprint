
import styles from './Basket.module.scss';

/**
 * Basket.
 */
export default function Basket( { localStorageName } ) {

  /**
   * Toggle shopping cart content
   */
  function toggleShoppingCartContent() {
    var x = document.getElementById("ShoppingCartContent")
    if (x.style.display === "none") {
      /* Add content to basket */
      document.getElementById('basketContent').innerHTML = BasketContent( localStorage.getItem( localStorageName ) )
      /* Show basket */
      x.style.display = "inline-block"
    } else {
      /* Hide basket */
      x.style.display = "none"
    }
  }

  /**
   * Basket content
   */
  function BasketContent( products ) {
    /* Set default */
    let items = ''
    let totalCost = 0
    let currency = '&pound;'
    /* If no products have been added to basket */
    if ( !products || products.length < 1) {
      return 'No products added.'
    }
    /* If we have products added to basket lets display them */
    let allProducts = JSON.parse('[' + products + ']')
    /* Loop for each item in basket */
    for( let j = 0; j < allProducts.length; j++ ) {
      let product = allProducts[j]
      let image = ( product.imagesSrc ) ? product.imagesSrc : "https://trustpaytest.wpengine.com/wp-content/uploads/woocommerce-placeholder.png"
      /* Format each row content */
      items+= '<div class='+styles.basketItem+' data-item="'+product.id+'">'
            + '<div class='+styles.basketItemImage+'><img src="'+image+'" alt="" /></div>'
            + '<div class='+styles.basketItemTitle+'>'+product.title+'</div>'
            + '<div class='+styles.basketItemPrice+'>'+currency+''+Number(product.price).toFixed(2)+'</div>'
            + '<div class='+styles.basketItemBin+'><img src="bin-icon.png" alt="" data-remove-item="'+product.id+'" /></div>'
            + '</div>'
      /* Update total cost */ 
      totalCost = Number(totalCost) + Number(product.price)
      totalCost = totalCost.toFixed(2)
      /* Update Shopping Cart title ( items count ) */
      document.getElementById( 'basketItemCount' ).innerHTML = allProducts.length
    }
    /* Update basket total */
    document.getElementById( 'basketTotal' ).innerHTML = currency + '' + totalCost

    /*
     * Remove item from basket 
     */
    document.body.addEventListener('click', function(e){
      for( let j = 0; j < allProducts.length; j++ ) {
        let product = allProducts[j]
        if ( Number(product.id) === Number(e.target.getAttribute('data-remove-item')) ) {
          /* Remove item from allProducts array */
          allProducts.splice(j, 1)
          /* Update localstorage */
          localStorage.setItem( localStorageName, JSON.stringify(allProducts).slice(1,-1) );
          /* Update basket items */
          e.target.parentNode.parentNode.remove()
          /* Update basket total cost */
          totalCost = Number(totalCost) - Number(product.price)
          totalCost = totalCost.toFixed(2)
          document.getElementById( 'basketTotal' ).innerHTML = currency + '' + totalCost
          /* Update Shopping Cart title ( items count ) */
          document.getElementById( 'basketItemCount' ).innerHTML = allProducts.length
          /* We only do this once per request, so now we can break the for() loop */
          break
        }
      }
    });

    /* Return items */
    return items
  }

  /**
   * Proceed to checkout
   */
  function proceedToCheckout() {
    window.location.assign( './shop/checkout' )
  }

  return (
    <>
      <div className={styles.border}>
        <div className={styles.icon}>
          <button
            id="buttonShoppingCart" 
            onClick={
              function() {
                toggleShoppingCartContent();
              }
            }  
            style={{
              "backgroundColor": "#eeeeee",
              "borderColor": "#eeeeee",
              "color": "#333333",
              "width": "200px",
            }}>Shopping Cart (<span id="basketItemCount">0</span>)</button>
        </div>
        <div 
          style={{ 
            "textAlign":"center",
          }}>
          <div 
            id="ShoppingCartContent" 
            className={styles.shoppingCartContent} 
            style={{
              "display":"none", 
              "zIndex":"9999", 
              "padding":"0"
            }}>
              <div 
                style={{
                  "padding":"10px"
                }}>
                <h6>Shopping Cart</h6>
                {/* Basket Content */}
                <div id="basketContent"></div>
                {/* Spacer ( bottom of basket ) */}
                <div 
                  style={{
                    "paddingBottom": "85px"
                  }}></div>
                {/* Basket Total */}
                <div
                  style={{
                    "width": "100%",
                    "position": "absolute",
                    "bottom": "50px",
                    "right": "32px",
                    "textAlign": "right",
                    }}>
                  Cart Total: <span id="basketTotal">0.00</span>
                </div>
                {/* Proceed to Checkout */}
                <div 
                  style={{
                    "width": "100%",
                    "position": "absolute",
                    "bottom": "0",
                    "textAlign": "center",
                    }}>
                  <button
                    id="buttonProceedCheckout" 
                    onClick={
                      function() {
                        proceedToCheckout();
                      }
                    }  
                    style={{
                      "backgroundColor": "#eeeeee",
                      "borderColor": "#eeeeee",
                      "color": "#333333",
                      "width": "80%",
                    }}>Make Payment</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

