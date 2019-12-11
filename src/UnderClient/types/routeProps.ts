import { UnauthenticatedRouteProps } from 'Shared/types/routeProps';

export interface UnauthenticatedRouteClientProps
  extends UnauthenticatedRouteProps {
  verifyEmailRedirectRoute?: string;
}
