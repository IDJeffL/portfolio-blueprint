import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  NavigationMenu
} from 'components';
import { getNextStaticProps } from '@faustwp/core';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import appConfig from 'app.config';
import { loadStripe } from '@stripe/stripe-js';

import styles from './shop.module.scss';

/**
 * Stripe API Vars
 * ( this should be configured in the .env.local file )
 */
const STRIPE_PK_KEY=process.env.NEXT_PUBLIC_STRIPE_PK_KEY
const STRIPE_SK_KEY=process.env.NEXT_PUBLIC_STRIPE_SK_KEY
const STRIPE_WOO_SITE_URL=process.env.NEXT_PUBLIC_STRIPE_WOO_SITE_URL
const STRIPE_WOO_CK_CS_BASE64_AUTH_KEY=process.env.NEXT_PUBLIC_STRIPE_WOO_CK_CS_BASE64_AUTH_KEY

/** 
 * Make sure to call `loadStripe` outside of a component’s 
 * render to avoid recreating the `Stripe` object on every render. 
 */
const stripePromise = loadStripe(STRIPE_PK_KEY);

/** 
 * Load Stripe payment/order result details.
 */
setTimeout(function() {
  const urlParams = ( typeof window !== 'undefined' ) ? window.location.search : ''
  if ( ! urlParams || urlParams === '') {
    return
  }
  const queryParameters = new URLSearchParams( urlParams )
  const paymentIntentInUrl = queryParameters.get("payment_intent")
  const stripe = require('stripe')(STRIPE_SK_KEY);
  const paymentIntent = stripe.paymentIntents.retrieve( paymentIntentInUrl )
        paymentIntent.then(function(result) {
          /* If result status is "succeeded" then update the WooCommerce Order status using the Order ID */
          if( result.status === "succeeded" ) {
            /* Clear My Shopping Cart */
            localStorage.removeItem('MyShoppingCart')
            /* Submit order details to WooCommerce ( order status is Pending Payment ) */
            /* Headers */
            let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Basic " + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY);
            /* Order Content */
            let raw = JSON.stringify({
              "set_paid": true,
              "needs_processing": true,
            });
            /* Request Options */
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            /* Get complete order from WooCommerce */
            fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/orders/" + result.metadata.order_id, requestOptions)
              .then(response => response.text())
              .then(result => {
                result = JSON.parse(result)
                /* Hide loading... text */
                document.getElementById( 'paymentLoading' ).style.display = 'none'
                /* Display loaded content */
                document.getElementById( 'paymentLoaded' ).style.display = 'block'
                /* Display date of purchase */
                const event = new Date( result.date_paid) ;
                document.getElementById( 'order_date' ).innerHTML = event.toUTCString()
                /* Display currency, order id & order total */
                document.getElementsByClassName( 'paymentCurrency' )[0].innerHTML = result.currency_symbol
                document.getElementById( 'order_id' ).innerHTML = result.id
                document.getElementById( 'order_total' ).innerHTML = result.total
              })
              .catch(error => console.log('error', error));  
          }
          else {
            console.log('Error: Invalid payment process')
          }
        })
}, 0);

export default function Page() {
  const { data, loading } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  function returnToShop() {
    window.location.assign("../shop")
  }

  return (
    <>
      <SEO title={pageTitle(data?.generalSettings)} />
      <Header menuItems={primaryMenu} />
      <Main>
        <EntryHeader title="Shop" />
        <div className="container">
          <h6>Payment Complete!</h6>

          {/* Order details loading */}
          <div id="paymentLoading">
            Loading...
          </div>

          {/* Order details loaded */}
          <div id="paymentLoaded"
               className={styles.paymentConfirmed}>

            {/* Order time/date */}
            <div>
              <span className={styles.paymentConfirmedTitle}>Time/Date: </span>
              <span className={styles.paymentConfirmedValue} 
                    id="order_date">---</span>
            </div>

            {/* Order number */}
            <div>
              <span className={styles.paymentConfirmedTitle}>Order Reference: </span>
              <span className={styles.paymentConfirmedValue} 
                    id="order_id">---</span>
            </div>

            {/* Order total */}
            <hr />
            <div>
              <span className={styles.paymentConfirmedTitle}>Total Paid: 
                <span className="paymentCurrency" 
                      style={{"float":"right"}}></span>
              </span>
              <span className={styles.paymentConfirmedValue} 
                    id="order_total">---</span>
            </div>

            {/* Return to Shop */}
            <div style={{
                "marginTop":"50px",
                "textAlign":"center"
              }}>
              <button 
                id="buttonPrevPage" 
                onClick={
                  function() {
                    returnToShop()
                  }
                } 
                className={styles.paymentButton}>
                  Return to Shop
              </button>
            </div>

          </div>
        </div>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPostsPage(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
  });
}
