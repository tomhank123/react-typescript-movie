import { ROUTE_LOGIN } from 'Shared/routers/routes';

export const ROUTE_OVERVIEW = '/';
export const ROUTE_PDF_MAPPING = '/pdf-mapping';
export const ROUTE_VIEW_MAPPED_PDF = '/view-mapped-pdf';
export const ROUTE_ACCOUNTS = '/accounts';

// Redirect Routes
export const ROUTE_UNAUTHENTICATED_REDIRECT = ROUTE_LOGIN;
export const ROUTE_AUTHENTICATED_REDIRECT = ROUTE_PDF_MAPPING;
