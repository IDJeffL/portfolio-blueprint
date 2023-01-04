import * as MENUS from 'constants/menus';

import { gql } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  GravityForms,
  EditHtml,
  LoginForm,
  RegisterForm,
  ResetPassword,
  UpdatePassword
} from '../components';
import { YoastSeoPageFragment } from 'fragments/YoastSeoPage';
import { GravityFormsFragment } from 'fragments/GravityForms';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { databaseId, title, content, featuredImage } = props?.data?.page ?? { title: '' };

  return (
    <>
      <SEO
        yoastSeo={props?.data?.page?.seo}
      />
      <EditHtml 
        postId={databaseId} 
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={title} image={featuredImage?.node} />
          <div className="container">
            {/* Original code.
              <ContentWrapper content={content} />
            */}
            <ContentWrapper>
            
              {/*
                Login/Registration
                If the post content includes any of the forms below
                then lets convert the WP Shortcode into the form html
                ( remember to remove the WP Shortcode from Gravityforms )
              */}
              <LoginForm postContent={props?.data?.page} />
              <RegisterForm postContent={props?.data?.page} />
              <ResetPassword postContent={props?.data?.page} />
              <UpdatePassword postContent={props?.data?.page} />            
            
              <GravityForms formContent={props?.data?.gfForms} postContent={props?.data?.page} />
            </ContentWrapper>
          </div>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${YoastSeoPageFragment}
  ${GravityFormsFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      databaseId
      title
      content
      ...FeaturedImageFragment
      ...YoastSeoPageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    gfForms(where: {orderby: {order: ASC}}) {
      nodes {
        ...GravityFormsFragment
      }
    }
    
  }
`;
