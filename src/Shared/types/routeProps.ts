export interface RouteProps {
  path: string;
  componentPath: string;
  exact?: boolean;
  match?: object;
}

export interface AuthenticatedRouteProps extends RouteProps {
  loginRoute: string;
}

export interface VerifiedRouteProps extends RouteProps {
  unverifiedRedirectRoute?: string;
}

export interface UnauthenticatedRouteProps extends RouteProps {
  authorizedRedirectRoute: string;
  verifyEmailRedirectRoute?: string;
}
