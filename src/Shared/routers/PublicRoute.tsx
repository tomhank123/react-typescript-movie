import * as React from 'react';
import { RouteProps } from 'Shared/types/routeProps';
import BaseRoute from './BaseRoute';

export const PublicRoute = (props: RouteProps) => {
  return <BaseRoute {...props} />;
};
