import * as MENUS from 'constants/menus';

import { gql } from '@apollo/client';
import {
  Header,
  Footer,
  Main,
  EntryHeader,
  NavigationMenu,
  ContentWrapper,
  FeaturedImage,
  SEO,
  TaxonomyTerms,
  GravityForms,
  Acf,
  LoginForm,
  RegisterForm,
  ResetPassword,
  UpdatePassword,
} from 'components';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { YoastSeoPostFragment } from 'fragments/YoastSeoPost';
import { GravityFormsFragment } from 'fragments/GravityForms';
import { AcfFragment } from 'fragments/Acf';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, date, author } = props.data.post;

  return (
    <>
      <SEO
        yoastSeo={props?.data?.post?.seo}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <>
          <EntryHeader
            title={title}
            image={featuredImage?.node}
            date={date}
            author={author?.node?.name}
          />
          <div className="container">
            {/* Original code.
            <ContentWrapper content={content}>
              <TaxonomyTerms post={props.data.post} taxonomy={'categories'} />
              <TaxonomyTerms post={props.data.post} taxonomy={'tags'} />
            </ContentWrapper>
            */}
            <ContentWrapper>
              {/*
                Login/Registration
                If the post content includes any of the forms below
                then lets convert the WP Shortcode into the form html
                ( remember to remove the WP Shortcode from Gravityforms )
              */}
              <LoginForm postContent={props?.data?.post} />
              <RegisterForm postContent={props?.data?.post} />
              <ResetPassword postContent={props?.data?.post} />
              <UpdatePassword postContent={props?.data?.post} />

              {/*
                ACF Content
              */}
              <Acf postContent={props?.data?.post} />

              {/* 
                You have the choice to use either the basic <ContentWrapper> component,
                <ContentWrapper content={content}>
                or include GF forms in WP Posts using the <GravityForms> component,
              */}
              <GravityForms formContent={props?.data?.gfForms} postContent={props?.data?.post} />

            </ContentWrapper>
          </div>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql` 
  ${BlogInfoFragment}
  ${YoastSeoPostFragment}
  ${GravityFormsFragment}
  ${AcfFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      tags {
        edges {
          node {
            name
            uri
          }
        }
      }
      categories {
        edges {
          node {
            name
            uri
          }
        }
      }
      ...FeaturedImageFragment
      ...YoastSeoPostFragment
      ...AcfFragment
    }
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
    gfForms(where: {orderby: {order: ASC}}) {
      nodes {
        ...GravityFormsFragment
      }
    }
  }
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};