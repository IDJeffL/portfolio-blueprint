import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 */
export default function SEO({ yoastSeo }) {
  if ( ! yoastSeo ) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{yoastSeo?.title}</title>
        <meta name="description" content={yoastSeo?.opengraphDescription} />
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
      </Head>
    </>
  );
}
