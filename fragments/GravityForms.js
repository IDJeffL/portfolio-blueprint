import { gql } from '@apollo/client';

export const GravityFormsFragment = gql`
  fragment GravityFormsFragment on GfForm {
    databaseId
    title
    formFields {
      nodes {
        ... on TextField {
          id
          label
          isRequired
          placeholder
          type
          description
        }
        ... on CheckboxField {
          id
          type
          label
          description
          isRequired
          choices {
            value
            text
          }
        }
      }
    }
  }
`;
