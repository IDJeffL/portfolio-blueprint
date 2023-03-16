import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  NavigationMenu,
  CheckoutForm
} from 'components'
import appConfig from 'app.config';
import { getNextStaticProps } from '@faustwp/core';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/**
 * Stripe API Urls
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
 * Create the Stripe checkout form
 */
function Stripe({ stripePromise, options, id }) {
  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm id={id} />
      </Elements>
    </>
  );
}

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

  /**
   * Calculate cost of shipping fees and tax
   * 
   * The WooCommerce tax_id value is configured in,
   * [WordPress-Domain]/wp-admin/admin.php?page=wc-settings&tab=tax&section=standard
   */
   function addShippingAndTax( subTotal = 0 ) {
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
        
        let totalCost = 0
        let subTotalWithTax = 0
        let subTotalAndShippingWithTax = 0
        let taxPercent = Number( result.rate ) / 100 

        let allProducts = localStorage.getItem( 'MyShoppingCart' )
            allProducts = JSON.parse('[' + allProducts + ']')

        /* Step 1: Update subTotal costs with tax rate */
        if ( result.shipping !== true ) {
          subTotalWithTax = subTotal * Number( taxPercent )
          totalCost = Number( subTotal )
                    + Number( subTotalWithTax ).toFixed(2)

          /* Assign total price to the Stripe amount */
          const stripe = require('stripe')(STRIPE_SK_KEY);
                stripe.paymentIntents.create({
                  amount: ( totalCost.toFixed(2) * 100 ), /* Convert 700.00 to 70000 */
                  currency: 'gbp',
                  automatic_payment_methods: {enabled: true},
                }).then((result) => {
                  setID({'id':result.id })
                  setItems({'clientSecret':result.client_secret,'appearance':{}})
                })

          /* Update total price on screen */
          document.getElementById('totalCheckoutPrice').innerHTML = 'Total Cost: £' + totalCost.toFixed(2)
        }

        /* Step 2: Update total costs ( and Shipping ) with tax rate ( this is an optional setting ) */
        if ( result.shipping === true ) {
          /* Get data from WooCommerce */
          let zone_id = 1 /* Shipping zone id */
          let selectedShippingID = localStorage.getItem( 'selectedShippingRate' )
          if ( Number( selectedShippingID ) ) {
            fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/shipping/zones/" + zone_id + "/methods/" + selectedShippingID, requestOptions)
              .then(response => response.text())
              .then(result => {
                result = JSON.parse(result)
                subTotalAndShippingWithTax = ( Number( subTotal ) + Number( result.settings.cost.value ) ) * Number( taxPercent )
                totalCost = Number( subTotal ) 
                          + Number( result.settings.cost.value ) 
                          + Number( subTotalAndShippingWithTax )

                /* Assign total price to the Stripe amount */
                const stripe = require('stripe')(STRIPE_SK_KEY);
                      stripe.paymentIntents.create({
                        amount: ( totalCost.toFixed(2) * 100 ), /* Convert 700.00 to 70000 */
                        currency: 'gbp',
                        automatic_payment_methods: {enabled: true},
                      }).then((result) => {
                        setID({'id':result.id })
                        setItems({'clientSecret':result.client_secret,'appearance':{}})
                      })

                /* Update total price on screen */
                document.getElementById('totalCheckoutPrice').innerHTML = 'Total Cost: £' + totalCost.toFixed(2)
              })
              .catch(error => console.log('error', error)); 
          }
        }
      })
      .catch(error => console.log('error', error));  
  }

  /**
   * Create the Stripe options value param
   * ( required for processing payments )
   */
  // eslint-disable-next-line
  const [id, setID] = useState();
  // eslint-disable-next-line
  const [options, setItems] = useState();
  // eslint-disable-next-line
  useEffect(() => {
    let cart = localStorage.getItem('MyShoppingCart')

    /* Get cart item ids */
    let cartItemIds = ''
    let cartItems = JSON.parse( '[' + cart + ']' )
    for ( let i = 0; i < cartItems.length; i++ ) {
       cartItemIds = cartItemIds + cartItems[i].id + ','
    }
    /* Headers */
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY);
    /* Request Options */
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    /* Get order details from WooCommerce */
    fetch( STRIPE_WOO_SITE_URL + "/wp-json/wc/v3/products/?include=" + cartItemIds, requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result)
        /* Get total price for all items */
        let totalPrice = 0
        for ( let i = 0; i < data.length; i++ ) {
          /* Get total items in basket for this data */
          for ( let j = 0; j < cartItems.length; j++ ) {
            if ( cartItems[j].id === data[i].id ) {
              /* Set price based on amount of items in basket using this data */
              totalPrice = totalPrice + Number( data[i].price )
            }
          }
        }
        /* Add shipping & tax cost */
        addShippingAndTax( totalPrice.toFixed(2) )
      })
    
  },[]);

  return (
    <>
      <SEO title={pageTitle(data?.generalSettings)} />
      <Header menuItems={primaryMenu} />
      <Main>
        <EntryHeader title="Shop" />
        <div className="container">
          <h6>Stripe Payment ( Credit/Debit Card )</h6>
          <div 
            style={{"marginBottom":"20px"}}>
              <span id="totalCheckoutPrice">Loading...</span>
          </div>
          {options && id && 
            <Stripe stripePromise={stripePromise} 
                    options={options} 
                    id={id} />}
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
