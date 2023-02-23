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

        {/* jQuery */}
        <script
          src="https://code.jquery.com/jquery-3.6.3.slim.min.js"
          integrity="sha256-ZwqZIVdD3iXNyGHbSYdsmWP//UBokj2FHAxKuSBKDSo="
          crossOrigin="anonymous" 
          async></script>

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
          async></script>

        {/* BootStrap CSS */}
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
          crossOrigin="anonymous" 
          async></link>

        {/* BootStrap JS */}  
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" 
          crossOrigin="anonymous" 
          async></script>

      </Head>
    </>
  );
}
