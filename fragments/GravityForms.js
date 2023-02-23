import { gql } from '@apollo/client';

export const GravityFormsFragment = gql`
  fragment GravityFormsFragment on GfForm {
    databaseId
    formId
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
          pageNumber
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
          pageNumber
        }
        ... on SelectField {
          id
          type
          label
          description
          isRequired
          choices {
            text
            value
          }
          pageNumber
        }
        ... on TextAreaField {
          id
          type
          label
          description
          isRequired
          pageNumber
        }   
        ... on PhoneField {
          id
          type
          label
          description
          isRequired
          pageNumber
        }     
        ... on EmailField {
          id
          type
          label
          description
          isRequired
          pageNumber
        } 
        ... on RadioField {
          id
          type
          label
          description
          isRequired
          choices {
            value
            text
          }
          pageNumber
        }  
        ... on HtmlField {
          id
          cssClass
          type
          content
        }         
      }
    }
  }
`;
