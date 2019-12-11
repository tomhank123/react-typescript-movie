import * as React from 'react';
import { ROUTE_AUTHENTICATED_REDIRECT } from './routes';
import { RouteProps } from 'Shared/types/routeProps';
import { default as UnauthenticatedRouteBase } from 'Shared/routers/UnauthenticatedRoute';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { Redirect } from 'react-router';
import { ROUTE_VERIFY_EMAIL } from 'Shared/routers/routes';
import { USER_VALIDATION_DATA } from 'Shared/constants/cookieKey';

const UnauthenticatedRoute = (props: RouteProps) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');

  if (
    cookieProvider.has(USER_VALIDATION_DATA) &&
    props.path !== ROUTE_VERIFY_EMAIL
  ) {
    return <Redirect to={{ pathname: ROUTE_VERIFY_EMAIL }} />;
  }
  return (
    <UnauthenticatedRouteBase
      {...props}
      authorizedRedirectRoute={ROUTE_AUTHENTICATED_REDIRECT}
    />
  );
};

export default UnauthenticatedRoute;
