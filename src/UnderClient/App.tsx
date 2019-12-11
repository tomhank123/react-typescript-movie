import * as React from 'react';
import { Switch } from 'react-router-dom';
import 'reflect-metadata';
import AppConfig from 'Shared/configs/appConfig';
import { DependencyInjectionProvider } from 'Shared/providers/DependencyInjectionProvider';
import { NotFoundRoute } from 'Shared/routers/NotFoundRoute';
import { PublicRoute } from 'Shared/routers/PublicRoute';
import { container } from './Container';
import AuthenticatedRoute from './routers/AuthenticatedRoute';
import { authenticatedRoutes } from './routers/authenticatedRoutes';
import { publicRoutes } from './routers/publicRoutes';
import UnauthenticatedRoute from './routers/UnauthenticatedRoute';
import { unauthenticatedRoutes } from './routers/unauthenticatedRoutes';
import { Spinner } from 'Shared/components/Spinner';
import SpinnerContextProvider from 'Shared/contexts/SpinnerContext';
import AuthContextProvider from 'Shared/contexts/AuthContext/AuthContext';

const appConfig = new AppConfig();
appConfig.init();

const App = () => {
  return (
    <DependencyInjectionProvider container={container}>
      <SpinnerContextProvider>
        <AuthContextProvider>
          <Switch>
            {publicRoutes.map(route => (
              <PublicRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                componentPath={route.componentPath}
              />
            ))}

            {unauthenticatedRoutes.map(route => (
              <UnauthenticatedRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                componentPath={route.componentPath}
              />
            ))}

            {authenticatedRoutes.map(route => (
              <AuthenticatedRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                componentPath={route.componentPath}
              />
            ))}

            {/* OTHER ROUTES */}
            <NotFoundRoute />
          </Switch>

          <Spinner />
        </AuthContextProvider>
      </SpinnerContextProvider>
    </DependencyInjectionProvider>
  );
};

export default App;
