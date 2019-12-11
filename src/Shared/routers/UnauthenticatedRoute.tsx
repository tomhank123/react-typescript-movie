import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from 'Shared/constants/cookieKey';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UnauthenticatedRouteProps } from 'Shared/types/routeProps';
import BaseRoute from './BaseRoute';

export const UnauthenticatedRoute = (props: UnauthenticatedRouteProps) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');

  if (cookieProvider.has(ACCESS_TOKEN)) {
    return <Redirect to={{ pathname: props.authorizedRedirectRoute }} />;
  }

  return <BaseRoute {...props} />;
};

export default UnauthenticatedRoute;
