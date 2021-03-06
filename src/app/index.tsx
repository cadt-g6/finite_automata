/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { AddFaPage } from './pages/AddFaPage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { theme } from 'themes';
import PageLayout from './components/PageLayout';
import './services/cloud_database/FirebaseConfig';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <PageLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/add" component={AddFaPage} />
            <Route exact path="/fas/:id" component={AddFaPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </ThemeProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
