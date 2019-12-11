import * as React from 'react';
import { Switch } from 'react-router-dom';
import 'reflect-metadata';
import AppConfig from 'Shared/configs/appConfig';
import { DependencyInjectionProvider } from 'Shared/providers/DependencyInjectionProvider';
import { NotFoundRoute } from 'Shared/routers/NotFoundRoute';
import { PublicRoute } from 'Shared/routers/PublicRoute';
import {
  ROUTE_GUIDE,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_APPLICATIONS
} from 'Shared/routers/routes';
import { container } from './Container';
import AuthenticatedRoute from './routers/AuthenticatedRoute';
import { ROUTE_PDF_MAPPING, ROUTE_VIEW_MAPPED_PDF } from './routers/routes';
import UnauthenticatedRoute from './routers/UnauthenticatedRoute';
import SpinnerContextProvider from 'Shared/contexts/SpinnerContext';
import AuthContextProvider from 'Shared/contexts/AuthContext';
import { Spinner } from 'Shared/components/Spinner';

const appConfig = new AppConfig();
appConfig.init();

const App = () => {
  return (
    <DependencyInjectionProvider container={container}>
      <SpinnerContextProvider>
        <AuthContextProvider>
          <Switch>
            <UnauthenticatedRoute
              exact
              path={ROUTE_LOGIN}
              componentPath='Shared/pages/Login'
            />

            <PublicRoute
              exact
              path={ROUTE_GUIDE}
              componentPath='Shared/pages/Login'
            />

            <AuthenticatedRoute
              exact
              path={ROUTE_HOME}
              componentPath='UnderAdmin/pages/Overview'
            />

            <AuthenticatedRoute
              exact
              path={ROUTE_APPLICATIONS}
              componentPath='Shared/pages/Applications'
            />

            <AuthenticatedRoute
              exact
              path={ROUTE_PDF_MAPPING}
              componentPath='UnderAdmin/pages/PdfMapping'
            />

            <AuthenticatedRoute
              exact
              path={ROUTE_VIEW_MAPPED_PDF}
              componentPath='UnderAdmin/pages/ViewMappedPDF'
            />
            <NotFoundRoute />
          </Switch>
          <Spinner />
        </AuthContextProvider>
      </SpinnerContextProvider>

      {/* <Spinner /> */}
    </DependencyInjectionProvider>
  );
};

export default App;
