import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 */
export default function SEO({ yoastSeo, title, description }) {

  /* Assign default values */
  title = ( undefined !== yoastSeo?.title ) ? yoastSeo?.title : title
  description = ( undefined !== yoastSeo?.opengraphDescription ) ? yoastSeo?.opengraphDescription : description

  return (
    <>
      <Head>

        {/* Yoast SEO */}
        <title>{title }</title>
        <meta name="description" content={description } />
        <meta property="og:title" content={yoastSeo?.opengraphTitle} />
        <meta property="og:description" content={yoastSeo?.opengraphDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={yoastSeo?.opengraphUrl} />
        <meta property="og:site_name" content={yoastSeo?.opengraphSiteName} />
        <meta property="og:image" content={yoastSeo?.opengraphImage?.mediaItemUrl} />
        <meta property="og:image:width" content={yoastSeo?.opengraphImage?.mediaDetails?.width} />
        <meta property="og:image:height" content={yoastSeo?.opengraphImage?.mediaDetails?.height} />
        <meta property="og:image:type" content={yoastSeo?.opengraphImage?.mimeType} />
        <meta name="twitter:title" content={yoastSeo?.twitterTitle} />
        <meta name="twitter:description" content={yoastSeo?.twitterDescription} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={yoastSeo?.twitterImage?.mediaItemUrl} />
        <link rel="canonical" href={yoastSeo?.opengraphUrl} />
        <script type="application/ld+json" className="yoast-schema-graph">{yoastSeo?.schema?.raw}</script>

        {/* Boilerplate CSS */}
        <link 
          rel='stylesheet' 
          type="text/css" 
          media='all' 
          href="https://idheadlessdev.wpengine.com/wp-content/themes/boilerplateparent/assets/css/theme.min.css" />

        {/* Boilerplate JS */}
        <script
          id='theme-js' 
          src='https://idheadlessdev.wpengine.com/wp-content/themes/boilerplateparent/assets/js/theme.min.js'
          async />

        {/* Stripe Payments */}  
        <script 
          src="https://js.stripe.com/v3/"
          async />

      </Head>
    </>
  );
}
