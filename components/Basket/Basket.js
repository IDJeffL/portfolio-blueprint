import Image from 'next/image'

import styles from './Basket.module.scss';

/**
 * Stripe API Vars
 * ( this should be configured in the .env.local file )
 */
const STRIPE_WOO_SITE_URL=process.env.NEXT_PUBLIC_STRIPE_WOO_SITE_URL
const STRIPE_WOO_CK_CS_BASE64_AUTH_KEY=process.env.NEXT_PUBLIC_STRIPE_WOO_CK_CS_BASE64_AUTH_KEY

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
    /* Add shipping zone choices to Shopping Cart */
    shippingZones()
  }

  /**
   * Get Shipping fees options
   * 
   * The WooCommerce shipping zone_id value is configured in,
   * [WordPress-Domain]/wp-admin/admin.php?page=wc-settings&tab=shipping
   */
  function shippingZones() {
    let zone_id = 1
    /* Headers */
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY);
    /* Request Options */
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    /* Get data from WooCommerce */
    fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/shipping/zones/" + zone_id + "/methods", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        let currency = '&pound;'
        let options = '<ul class=' + styles.basketShippingOption + '>'
        {result?.map((r, i) => {
          let checked = ''
          if ( i === 0 ) {
            checked = ' checked '
          }
          options+= '<li><input ' + checked + ' class="' + styles.basketRadioOption + '" type="radio" id="shippingOption" name="shippingOption" value="' + r.id + '">' + r.title + ' (' + currency + r.settings.cost.value + ')</li>'
        })}
        options+= '</ul>'
        document.getElementById( 'shippingOptions' ).innerHTML = options
      })
      .catch(error => console.log('error', error)); 
  }

  /**
   * Calculate total cost of order products, shipping fees and tax
   * 
   * The WooCommerce tax_id value is configured in,
   * [WordPress-Domain]/wp-admin/admin.php?page=wc-settings&tab=tax&section=standard
   */
  function totalCost() {
    let tax_id = 2
    /* Headers */
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY);
    /* Request Options */
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    /* Get data from WooCommerce */
    fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/taxes/" + tax_id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        
        let subTotal = 0       
        let subTotalWithTax = 0 
        let subTotalAndShippingWithTax = 0
        let taxPercent = Number( result.rate ) / 100 
        let allProducts = localStorage.getItem( localStorageName )
            allProducts = JSON.parse('[' + allProducts + ']')

        /* Step 1: Update subTotal costs with tax rate */
        if ( result.shipping !== true ) {
          for ( let i = 0; i < allProducts.length; i++ ) {
            subTotal = subTotal + Number( allProducts[i].price )
            subTotalWithTax = subTotal * Number( taxPercent )
            document.getElementById( 'totalCost' ).innerHTML = currency + subTotalWithTax.toFixed(2)
          } 
        }

        /* Step 2: Update total costs ( and Shipping ) with tax rate ( this is an optional setting ) */
        if ( result.shipping === true ) {
          /* Get data from WooCommerce */
          let zone_id = 1 /* Shipping zone id */
          let selectedShippingID = document.querySelector('input[name="shippingOption"]:checked').value; /* Selected shipping id */
          if ( Number( selectedShippingID ) ) {
            fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/shipping/zones/" + zone_id + "/methods/" + selectedShippingID, requestOptions)
              .then(response => response.text())
              .then(result => {
                result = JSON.parse(result)
                for ( let i = 0; i < allProducts.length; i++ ) {
                  subTotal = subTotal + Number( allProducts[i].price )
                } 
                subTotalAndShippingWithTax = ( Number( subTotal ) + Number( result.settings.cost.value ) ) * Number( taxPercent )
                document.getElementById( 'totalCost' ).innerHTML = currency + subTotalAndShippingWithTax.toFixed(2)
                /* Update total payable */
                totalPayable( 
                  Number( subTotal ) 
                  + Number( result.settings.cost.value ) 
                  + Number( subTotalAndShippingWithTax.toFixed(2) ) 
                )
              })
              .catch(error => console.log('error', error)); 
          }
        }
      })
      .catch(error => console.log('error', error));     

    let currency = '&pound;'
    document.getElementById( 'totalCost' ).innerHTML = '<img style="height: 20px;" src="./spin.webp">'
    document.getElementById( 'totalPayable' ).innerHTML = '<img style="height: 20px;" src="./spin.webp">'
  }

  /**
   * Display the total payable
   */
  function totalPayable( total = '0.00' ) {
    let currency = '&pound;'
    document.getElementById( 'totalPayable' ).innerHTML = currency + Number( total ).toFixed(2)
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
      /* Update selected shipping rate */
      updateSelectedShippingRate()
    });

    /* Return items */
    return items
  }

  /**
   * Update selected shipping rate
   */
  function updateSelectedShippingRate() {

    let selectedShippingID = ( document.querySelector('input[name="shippingOption"]') !== null ) 
                               ? document.querySelector('input[name="shippingOption"]:checked').value 
                               : 4 /* Set default shipping id */

    localStorage.setItem( 'selectedShippingRate', selectedShippingID );

    /* Update total cost */
    totalCost()
  }  

  /**
   * Proceed to checkout
   */
  function proceedToCheckout() {
    /* Close cart window */
    toggleShoppingCartContent()
    /* Redirect to checkout */
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
                <hr 
                  style={{"marginTop": "0"}}/>  
                {/* Basket Total */}
                <table 
                  style={{
                    "border": "0",
                    "fontSize": "14px",
                    "marginBottom": "50px"
                  }}>
                  <tbody>
                    <tr>
                      <td 
                        style={{
                          'padding': '0',
                          'width': '102px'
                          }}>Subtotal:</td>
                      <td>
                        <span id="basketTotal">0.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td 
                        style={{
                          'padding': '0',
                          "verticalAlign": "text-top",
                        }}>Shipping:</td>
                      <td>
                        <span id="shippingOptions">
                          <Image
                              src="/spin.webp" 
                              alt="Loading"
                              width={20}
                              height={20}
                              />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          'padding': '0'
                          }}>Tax:</td>
                      <td>
                        <span id="totalCost">
                          0.00
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          'padding': '0'
                          }}>Total Payable:</td>
                      <td>
                        <span id="totalPayable">
                          0.00
                        </span>
                      </td>
                    </tr> 
                  </tbody>               
                </table>
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

