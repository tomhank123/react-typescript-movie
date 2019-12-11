import * as React from 'react';
import { default as AuthenticatedRouteBase } from 'Shared/routers/AuthenticatedRoute';
import { RouteProps } from 'Shared/types/routeProps';
import { ROUTE_UNAUTHENTICATED_REDIRECT } from './routes';

const AuthenticatedRoute = (props: RouteProps) => {
  return (
    <AuthenticatedRouteBase
      {...props}
      loginRoute={ROUTE_UNAUTHENTICATED_REDIRECT}
    />
  );
};

export default AuthenticatedRoute;
