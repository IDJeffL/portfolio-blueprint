import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import React, { useState }  from 'react';
import useSWR, { preload } from "swr";
import axios from 'axios';
import Image from 'next/image'
import {
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  NavigationMenu,
  Basket,
} from 'components';
import { getNextStaticProps } from '@faustwp/core';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import appConfig from 'app.config';

  /**
   * Stripe API Vars
   * ( this should be configured in the .env.local file )
   */
   const STRIPE_WOO_CK_CS_BASE64_AUTH_KEY='Y2tfOTM0Nzg0ZmUzYjZhMDJmZGY5N2FhZmQyNTY0MmU5YmVjZGNkN2FjYTpjc18zODFmNjQ3Y2NlY2M3MTk1YzdkYzcyOTMwMDA0ZDBmNGI4OWNhMGMz'
   const STRIPE_WOO_SITE_URL='https://trustpaytest.wpengine.com'
 
   /* Append to Fetch Request */
   let fetcher = (url) => {
     return axios
         .get(url, { 
             headers: { 
                 'Authorization': 'Basic ' + STRIPE_WOO_CK_CS_BASE64_AUTH_KEY,
                 'Accept': 'application/json'
             }
         })
         .then((res) => [res.data, res.headers] );
   } 

export default function Page() { 
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPagesIndex] = useState(0);

  const { data, loading, fetchMore } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  /* Posts Per Page */
  const perPage = 6

  /* Total Products Count */
  let totalPagesCount = 0

  /* Total Products Count */
  let totalProductsCount = 0

  /* Get Product(s) */
  function WooCommerceShop ({ pageIndex }) {
    if ( pageIndex < 1 ) {
      pageIndex = 1
    }
    /* Get data */
    let url = STRIPE_WOO_SITE_URL + '/wp-json/wc/v3/products/?status=publish'
    let params = '&per_page=' + perPage 
               + '&page=' + pageIndex
               + '&orderby=id'
               + '&order=desc'
    const { data } = useSWR( url + params, fetcher );

    /* If there's no data to return */
    if ( data === undefined ) {
      return ''
    } 
    /* Else, return data and setup navigation... */
    else {
      /* Set total pages count */
      totalPagesCount = data[1]['x-wp-totalpages']
      /* Set total products count */
      totalProductsCount = data[1]['x-wp-total']
      document.getElementById( 'totalProductsCount' ).innerHTML = totalProductsCount
      /* Hide containers */
      document.getElementById( 'loading' ).style.display = 'none'
      /* Show containers */
      document.getElementById( 'selectInfo' ).style.display = 'inline-block'
      document.getElementById( 'selectWooCommerceProductType' ).style.display = 'inline-block'
      document.getElementById( 'navigationWooCommerceProducts' ).style.display = 'inline-block'
      /* Update Shopping Cart button text ( inc. items count ) */
      let shoppingCartItems = JSON.parse('[' + localStorage.getItem( 'MyShoppingCart' ) + ']')
      if ( ! shoppingCartItems || shoppingCartItems[0] === null ) {
        shoppingCartItems.length = ''
      }
      document.getElementById( 'basketItemCount' ).innerHTML = shoppingCartItems.length
      /* Return products data */
      return ( data[0] ) ? WooCommerceProducts( data[0], pageIndex ) : ''
    }
  }

  /* Display Product(s) */
  function WooCommerceProducts( data, pageIndex ) {

    let products = data.map(item => 
      <div key={item.id} 
           style={{ 
            "display":"inline-block", 
            "width":"32%", 
            "margin":"5px 5px 50px 5px", 
            "verticalAlign":"top",
            "textAlign":"center",
           }}>
        <div> 
          {item.images[0] &&
            <Image 
              src={item.images[0].src}
              alt=''
              width='75%'
              height='75%' 
              layout='responsive'
              />
          }
          {!item.images[0] &&
            <Image 
              src="https://trustpaytest.wpengine.com/wp-content/uploads/woocommerce-placeholder.png"
              alt='' 
              width='75%'
              height='75%' 
              layout='responsive'
              />
          }
        </div>      
        <div> 
          {item.name}
        </div>   
        <div
          dangerouslySetInnerHTML={{
            __html: item.price_html,
          }}
          ></div>
          <button 
            style={{
              "backgroundColor": "#eeeeee",
              "borderColor": "#eeeeee",
              "color": "#333333",
              "margin":"20px 0 0 0",
            }}
            onClick={
              function() {
                /* Save item to cache */
                saveDataToShoppingCart(
                  'MyShoppingCart', // Shopping Cart Name
                  item              // Shopping Cart Item
                )
                /* Update Shopping Cart button title ( inc. items count ) */
                let shoppingCartItems = JSON.parse('[' + localStorage.getItem( 'MyShoppingCart' ) + ']')
                document.getElementById( 'basketItemCount' ).innerHTML = shoppingCartItems.length
              }
            }>Add to Cart</button>
      </div>
    )

    // Update total products count on page
    if ( products.length > 0 && document.getElementById( 'startCount'+pageIndex ) ) {
      document.getElementById( 'startCount'+pageIndex ).innerHTML = ( pageIndex * products.length ) - ( products.length - 1 )
      document.getElementById( 'endCount'+pageIndex ).innerHTML = pageIndex * products.length
      // For items that count less than the perPage value ( eg. on the last page )
      if ( products.length < perPage ) {
        document.getElementById( 'startCount'+pageIndex ).innerHTML = ( pageIndex * perPage ) - ( perPage - 1 )
        document.getElementById( 'endCount'+pageIndex ).innerHTML = totalProductsCount
      }
    }

    return products
  }

  /* Save item to Cart */
  const saveDataToShoppingCart = ( localStorageName, productData ) => {

    /* Get saved items */
    let localStorageItems = localStorage.getItem( localStorageName )

    /* Define what product data we want to add to the checkout item ( storage item ) */
    productData = {
      'id' : productData.id,
      'title' : productData.name,
      'imagesSrc' : ( productData.images[0] ) ? productData.images[0].src : '',
      'price' : productData.price,
      'salePrice' : productData.sale_price,
      'sku' : productData.sku,
    }

    /* Stringify new item so we can add this item to the current items in cart */
    let productsData = ( localStorageItems ) ? localStorageItems + ',' + JSON.stringify(productData) : JSON.stringify(productData)

    /* Add item to cart */
    localStorage.setItem( localStorageName, productsData );
  };

  return (
    <>
      <SEO title={pageTitle(data?.generalSettings)} />
      <Header menuItems={primaryMenu} />
      <Main>
        <EntryHeader title="Shop" />
        <div className="container">
        <h6>Welcome to the WooCommerce Shop!</h6>
          <div>
            <p id="loading">
              Loading...
            </p>
              <div 
                id="selectInfo" 
                style={{ 
                  "display": "none", 
                  "width": "100%" 
                }}>
                <div style={{ "textAlign":"right" }}>
                <Basket localStorageName="MyShoppingCart" />  
                </div>
                <select 
                  id="selectWooCommerceProductType" 
                  style={{
                    "display":"none"
                  }}>
                    <option value="">Default sorting</option>
                    <option value="1">Price: Low &gt; High</option>
                    <option value="2">Price: High &gt; Low</option>
                    <option value="3">Popularity</option>
                </select> Showing <span id={'startCount'+pageIndex}>0</span> to <span id={'endCount'+pageIndex}>0</span> of <span id="totalProductsCount">{totalProductsCount}</span> results
              </div>
              <div 
                style={{
                  "textAlign":"center"
                }}>
                <WooCommerceShop pageIndex={pageIndex} />
                <div style={{ display: 'none' }}>
                  <WooCommerceShop pageIndex={pageIndex + 1} />
                </div>
              </div>
              <div 
                id="navigationWooCommerceProducts" 
                style={{
                  "textAlign":"center", 
                  "width":"100%", 
                  "display":"none"
                }}>
                <button 
                  id="buttonPrevPage" 
                  onClick={
                    function() {
                      if ( pageIndex === 1 ) {
                        return false
                      } else {
                        setPageIndex(pageIndex - 1);
                      }
                    }
                  } 
                  style={{
                    "backgroundColor":"#eeeeee",
                    "borderColor":"#eeeeee",
                    "color":"#333333",
                    "margin":"20px 5px 0 0",
                    "width":"100px",
                  }}>Previous</button>
                <button 
                  id="buttonNextPage" 
                  onClick={
                    function() {
                      if ( pageIndex === Number( totalPages ) ) {
                        return false
                      } else {
                        setPageIndex(pageIndex + 1);
                        setTotalPagesIndex( totalPagesCount );  
                      }
                    }
                  } 
                  style={{
                    "backgroundColor":"#eeeeee",
                    "borderColor":"#eeeeee",
                    "color":"#333333",
                    "margin":"20px 0 0 5px",
                    "width":"100px",
                  }}>Next</button>
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
