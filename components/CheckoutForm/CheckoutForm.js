import React, {useState, useEffect} from 'react';
import {useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import styles from './CheckoutForm.module.scss';

/**
 * Stripe API Vars
 * ( this should be configured in the .env.local file )
 */
 const STRIPE_WOO_CK_CS_BASE64_AUTH_KEY='Y2tfOTM0Nzg0ZmUzYjZhMDJmZGY5N2FhZmQyNTY0MmU5YmVjZGNkN2FjYTpjc18zODFmNjQ3Y2NlY2M3MTk1YzdkYzcyOTMwMDA0ZDBmNGI4OWNhMGMz'
 const STRIPE_WOO_SITE_URL='https://trustpaytest.wpengine.com'
 const STRIPE_RETURN_URL='https://hdxj0sc18jcxck49ro00bhabk.js.wpenginepowered.com/shop/complete'
 const STRIPE_SK_KEY='sk_test_51MhWNsG3zgRiYfgw5JPvCFl2YEwbVFkNokgu0a9cbczDg8J9JOYOtLThw2ZE3uqaXvSmejWLA82auflqHrrVsQCh00qO4U0pH5'

/**
 * Update Order with Custom Values
 */
 function updateCustomValues( pi_ID, order_key, order_id  ) {
    try {
      const stripeOrder = require('stripe')(STRIPE_SK_KEY);
      const paymentIntent = stripeOrder.paymentIntents.update(
              pi_ID,
              {
                metadata: {
                  order_key: order_key,
                  order_id: order_id
                }
              }
            )
    }
    catch (err) {
      console.log('err: ', err)
    }
 }

export default function CheckoutForm( id ) {
  const pi_ID = ( id ) ? id.id.id : 0

  // eslint-disable-next-line
  const stripe = useStripe();
  // eslint-disable-next-line 
  const elements = useElements()
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleSubmit = async (event) => {
    /*
      We don't want to let default form submission happen here,
      which would refresh the page.
    */
    event.preventDefault();

    if (!stripe || !elements) {
      /*
        Stripe.js has not yet loaded.
        Make sure to disable form submission until Stripe.js has loaded.
      */
      return;
    }

    const error = await stripe.confirmPayment({
      /* `Elements` instance that was used to create the Payment Element */
      elements,
      confirmParams: {
        return_url: STRIPE_RETURN_URL,
      },
      /* 
        For debug payment testing, check browser console, 
        If enabled will prevent page reload, comment out for prod.
      */
      /* redirect: "if_required" */
      }).then(function(result) {
        /* Optional, but we dont need to do anything here right now... */
      });
      if (error) {
        /*
          This point will only be reached if there is an immediate error when
          confirming the payment. Show error to your customer (for example, payment
          details incomplete)
        */
        setErrorMessage(error.message);
      } else {
        /* 
          Your customer will be redirected to your `return_url`. For some payment
          methods like iDEAL, your customer will be redirected to an intermediate
          site first to authorize the payment, then redirected to the `return_url`.
        */
      }
    };

  // eslint-disable-next-line
  useEffect(() => {
    /* On card details iframe focus */
    window.addEventListener('blur',function(){
      if (document.activeElement instanceof HTMLIFrameElement) {
        let cart = localStorage.getItem('MyShoppingCart')
        let cartItems = JSON.parse( '[' + cart + ']' )

        /* Group individual items into multi-groups for order 'line_items' */
        let cartItemsGroups = []
        let line_items = []
        for ( let i = 0; i < cartItems.length; i++ ) {
          if ( cartItemsGroups[cartItems[i].id] === undefined ) {
            cartItemsGroups[cartItems[i].id] = 1
          } else {
            cartItemsGroups[cartItems[i].id]++
          }
        }
        cartItemsGroups.forEach(function(val, item) {
          line_items.push({"product_id": item, "quantity": val})
        })

        /* Headers */
        let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Basic " + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY);

        /* Get shipping cost */
        let zone_id = 1 /* Shipping zone id */
        let selectedShippingID = localStorage.getItem( 'selectedShippingRate' )
        if ( Number( selectedShippingID ) ) {
          /* Request Options */
          let requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };
          fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/shipping/zones/" + zone_id + "/methods/" + selectedShippingID, requestOptions)
            .then(response => response.text())
            .then(result => {
              result = JSON.parse(result)
              /* Submit order details to WooCommerce ( order status isPending Payment ) */
              /* Form Fields Content */
              let formFieldsBilling = window.document.getElementsByClassName('billingField')
              let formFieldsShipping = window.document.getElementsByClassName('shippingField')
              /* Order Content */
              let raw = JSON.stringify({
                "payment_method": "stripe",
                "payment_method_title": "Stripe",
                "set_paid": false,
                "needs_processing": false,
                "billing": {
                  "first_name": formFieldsBilling["billing['first_name']"].value,
                  "last_name": formFieldsBilling["billing['last_name']"].value,
                  "address_1": formFieldsBilling["billing['address_1']"].value,
                  "address_2": formFieldsBilling["billing['address_2']"].value,
                  "city": formFieldsBilling["billing['city']"].value,
                  "state": formFieldsBilling["billing['state']"].value,
                  "postcode": formFieldsBilling["billing['postcode']"].value,
                  "country": formFieldsBilling["billing['country']"].value,
                  "email": formFieldsBilling["billing['email']"].value,
                  "phone": formFieldsBilling["billing['phone']"].value,
                },
                "shipping": {
                  "first_name": formFieldsShipping["shipping['first_name']"].value,
                  "last_name": formFieldsShipping["shipping['last_name']"].value,
                  "address_1": formFieldsShipping["shipping['address_1']"].value,
                  "address_2": formFieldsShipping["shipping['address_2']"].value,
                  "city": formFieldsShipping["shipping['city']"].value,
                  "state": formFieldsShipping["shipping['state']"].value,
                  "postcode": formFieldsShipping["shipping['postcode']"].value,
                  "country": formFieldsShipping["shipping['country']"].value,
                },
                "line_items":line_items,
                "shipping_lines": [
                  {
                    "method_id": result.method_id,
                    "method_title": result.method_title,
                    "total": result.settings.cost.value
                  }
                ]
              });

              /* Request Options */
              requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              /* Save Order to WooCommerce */
              fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/orders", requestOptions)
                .then(response => response.text())
                .then(result => {
                  let data = JSON.parse(result)
                  /* Update Order with Custom Values */
                  updateCustomValues( pi_ID, data.order_key, data.id )
                })
                .catch(error => console.log('error', error));  
            })
        }
      }
    })

  }, [pi_ID]);

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <div>

        {/* Billing Details */}
        <div style={{
            "display":"inline-block",
            "width":"50%"
          }}>
          <h6>Billing Details</h6>
          <p>*Required Field</p>
          <ul className="BillingDetails" style={{"listStyleType":"none"}}>
            <li>
              <input className="billingField" type="text" id="billing['first_name']" name="billing['first_name']" placeholder="First Name" required />*
            </li>
            <li>
              <input className="billingField" type="text" id="billing['last_name']" name="billing['last_name']" placeholder="Last Name" required />*
            </li>
            <li>
              <input className="billingField" type="text" id="billing['address_1']" name="billing['address_1']" placeholder="Address Line 1" required />*
            </li>
            <li>
              <input className="billingField" type="text" id="billing['address_2']" name="billing['address_2']" placeholder="Address Line 2" />
            </li>
            <li>
              <input className="billingField" type="text" id="billing['city']" name="billing['city']" placeholder="City" required />*
            </li>
            <li>
              <input className="billingField" type="text" id="billing['state']" name="billing['state']" placeholder="State/County" />
            </li>
            <li>
              <input className="billingField" type="text" id="billing['postcode']" name="billing['postcode']" placeholder="Postcode" required />*
            </li>
            <li>
              <input className="billingField" type="text" id="billing['country']" name="billing['country']" placeholder="Country (eg. USA/UK)" required />
            </li> 
            <li>
              <input className="billingField" type="text" id="billing['email']" name="billing['email']" placeholder="Email" required />
            </li> 
            <li>
              <input className="billingField" type="text" id="billing['phone']" name="billing['phone']" placeholder="Phone" required />
            </li> 
          </ul>
        </div>

        {/* Shipping Details */}
        <div style={{
            "display":"inline-block",
            "verticalAlign":"top",
            "paddingLeft":"10px",
            "width":"50%"
          }}>
          <h6>Shipping Details</h6>
          <p>Ship to a different address?</p>
          <ul className="ShippingDetails"  style={{"listStyleType":"none"}}>
            <li>
              <input className="shippingField" type="text" id="shipping['first_name']" name="shipping['first_name']" placeholder="First Name" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['last_name']" name="shipping['last_name']" placeholder="Last Name" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['address_1']" name="shipping['address_1']" placeholder="Address Line 1" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['address_2']" name="shipping['address_2']" placeholder="Address Line 2" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['city']" name="shipping['city']" placeholder="City" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['state']" name="shipping['state']" placeholder="State/County" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['postcode']" name="shipping['postcode']" placeholder="Postcode" />
            </li>
            <li>
              <input className="shippingField" type="text" id="shipping['country']" name="shipping['country']" placeholder="Country (eg. USA/UK)" />
            </li> 
          </ul>
        </div>

      </div>

      <hr />

      {/* Payment Form */}
      <div id="paymentForm">
        <h6>Card Details</h6>
        <PaymentElement />
        <div style={{
              "width":"100%",
              "textAlign":"center"
            }}>
          <button id="submitPayment" disabled={!stripe}
                className={styles.paymentButton}>Proceed</button>
        </div>
      </div>

      {/* Show error message(s) to customer */}
      {errorMessage && <div>{errorMessage}</div>}

    </form>
  )
};