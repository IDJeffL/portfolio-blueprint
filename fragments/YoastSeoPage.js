import { gql } from '@apollo/client';

export const YoastSeoPageFragment = gql`
  fragment YoastSeoPageFragment on Page {
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
