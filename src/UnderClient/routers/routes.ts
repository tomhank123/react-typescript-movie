import { ROUTE_LOGIN } from 'Shared/routers/routes';

export const ROUTE_OVERVIEW = '/';
export const ROUTE_VERIFY_EMAIL = '/verify-email';
export const ROUTE_EDIT_ACCOUNT = '/edit-account';
export const ROUTE_DEACTIVATED_ACCOUNT = '/deactivated-account';
export const ROUTE_REGISTER = '/register';
export const ROUTE_REGISTER_PARAM = '/register/:invitationCode';
export const ROUTE_TERMS = '/terms';
export const ROUTE_ALL_PROFILE = '/all-profile';
export const ROUTE_TEAM_MANAGEMENT = '/team/:companyId';
export const ROUTE_MEMBER_EDITED = '/team/:companyId/member/:memberId';

// Redirect Routes
export const ROUTE_UNAUTHENTICATED_REDIRECT = ROUTE_LOGIN;
export const ROUTE_AUTHENTICATED_REDIRECT = ROUTE_OVERVIEW;

export const ROUTE_UNVERIFIED_REDIRECT = ROUTE_VERIFY_EMAIL;
export const ROUTE_VERIFIED_REDIRECT = ROUTE_OVERVIEW;
