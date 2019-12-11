import * as React from 'react';
import { default as UnauthenticatedRouteBase } from 'Shared/routers/UnauthenticatedRoute';
import { RouteProps } from 'Shared/types/routeProps';
import { ROUTE_AUTHENTICATED_REDIRECT } from './routes';

const UnauthenticatedRoute = (props: RouteProps) => {
  return (
    <UnauthenticatedRouteBase
      {...props}
      authorizedRedirectRoute={ROUTE_AUTHENTICATED_REDIRECT}
    />
  );
};

export default UnauthenticatedRoute;
