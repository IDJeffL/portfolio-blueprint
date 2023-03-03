import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import {
  Button,
  Header,
  Footer,
  Main,
  NavigationMenu,
  SearchInput,
  SEO,
  Relevanssi,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { useState } from 'react';
import styles from 'styles/pages/_Search.module.scss';
import appConfig from 'app.config';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: pageData } = useQuery(Page.query, {
    variables: Page.variables(),
  });
  const { title: siteTitle, description: siteDescription } = pageData.generalSettings;
  const primaryMenu = pageData.headerMenuItems.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <div className={styles['search-header-pane']}>
          <div className="container small">
            <h2 className={styles['search-header-text']}>
              Search
            </h2>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
            />
          </div>
        </div>

        <div className="container small">
          <Relevanssi searchQuery={searchQuery} />
        </div>

      </Main>
      <Footer title={siteTitle} menuItems={primaryMenu} />
    </>
  );
}

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
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

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, { Page });
}
