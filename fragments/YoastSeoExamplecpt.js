import { gql } from '@apollo/client';

export const YoastSeoExamplecpt = gql`
  fragment YoastSeoExamplecpt on Examplecpt {
    seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphSiteName
      opengraphImage {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
        mimeType
      }
      twitterTitle
      twitterDescription
      twitterImage {
        mediaItemUrl
      }
      schema {
        raw
      }
    }
  }
`;
