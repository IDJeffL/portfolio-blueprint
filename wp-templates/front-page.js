import * as MENUS from 'constants/menus';

import { useQuery, gql} from '@apollo/client';
import { FaArrowRight } from 'react-icons/fa';
import styles from 'styles/pages/_Home.module.scss';
import {
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  NavigationMenu,
  SEO,
  Header,
  Footer,
  Posts,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

if ( typeof window !== "undefined" ) {
  window.$ = window.jQuery = require('jquery')
}

const postsPerPage = 3;

export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });
  if (loading) {
    return null;
  }
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  },[])
  
  useEffect(() => {
    $("h1").fadeOut(3000).fadeIn(3000)
  },[])

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Portfolio Banner',
  };

  return (
    <>
      <SEO 
        yoastSeo='' 
        title={siteTitle} 
        description={siteDescription} 
        />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">
          <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              Welcome to your Blueprint
            </Heading>
            <p className={styles.description}>
              Achieve unprecedented performance with modern frameworks and the
              world&apos;s #1 open source CMS in one powerful headless platform.{' '}
            </p>
            <div className={styles.actions}>
              <Button styleType="secondary" href="/posts">
                GET STARTED
              </Button>
              <Button styleType="primary" href="/about">
                LEARN MORE
              </Button>
            </div>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
          <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              Latest Posts
            </Heading>
            <Posts posts={data.posts?.nodes} id="posts-list" />
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
        </div>
      </Main>
      <Footer menuItems={footerMenu} />
    </>
  );
}

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    first: postsPerPage,
  };
};

/**
 * We dont want specific WP Posts in this query.
 * Limit results using the notIn 'Post id' value.
 * 
 * Login:           cG9zdDoyMzE=
 * Register:        cG9zdDoyMzM=
 * Reset Password:  cG9zdDoyMzU=
 * Update Password: cG9zdDoyMzc=
 * Search:          cG9zdDoyOTE=
 */

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(
      first: $first,
      where: {
        notIn: [
          "cG9zdDoyMzE=",
          "cG9zdDoyMzM=",
          "cG9zdDoyMzU=",
          "cG9zdDoyMzc=",
          "cG9zdDoyOTE="
        ]
      }
    ) {
      nodes {
        ...PostsItemFragment
      }
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
  }
`;
