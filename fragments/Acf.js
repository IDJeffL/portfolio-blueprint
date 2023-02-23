import { gql } from '@apollo/client';

export const AcfFragment = gql`
  fragment AcfFragment on Post {
    acfExample {
      fieldGroupName
      exampleTextField
      exampleTextareaField
      exampleImage {
        mediaItemUrl
      }
    }
  }
`;