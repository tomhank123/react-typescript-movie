import * as React from 'react';
import { default as AuthenticatedRouteBase } from 'Shared/routers/AuthenticatedRoute';
import { RouteProps } from 'Shared/types/routeProps';
import {
  ROUTE_UNAUTHENTICATED_REDIRECT,
  ROUTE_TEAM_MANAGEMENT,
  ROUTE_AUTHENTICATED_REDIRECT,
  ROUTE_MEMBER_EDITED,
  ROUTE_DEACTIVATED_ACCOUNT
} from './routes';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { Redirect } from 'react-router';
import { USER_ROLE, USER_STATUS, USER_ID } from 'Shared/constants/cookieKey';
import { UserRole } from 'Shared/constants/userRole';
import { UserStatus } from 'Shared/constants/userStatus';
const get = require('lodash/get');

const AuthenticatedRoute = (props: RouteProps) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRole = cookieProvider.get(USER_ROLE);
  const roleAminPage: string[] = [ROUTE_TEAM_MANAGEMENT, ROUTE_MEMBER_EDITED];
  const userID = cookieProvider.get(USER_ID);
  const memberId = get(props, 'computedMatch.params.memberId', '');

  if (
    roleAminPage.indexOf(props.path) > -1 &&
    userRole !== UserRole.CLIENT_ADMIN
  ) {
    if (userID !== memberId) {
      return <Redirect to={{ pathname: ROUTE_AUTHENTICATED_REDIRECT }} />;
    }
  }

  if (
    cookieProvider.get(USER_STATUS) === UserStatus.INACTIVE &&
    props.path !== ROUTE_DEACTIVATED_ACCOUNT
  ) {
    return <Redirect to={{ pathname: ROUTE_DEACTIVATED_ACCOUNT }} />;
  }
  return (
    <AuthenticatedRouteBase
      {...props}
      loginRoute={ROUTE_UNAUTHENTICATED_REDIRECT}
    />
  );
};

export default AuthenticatedRoute;
