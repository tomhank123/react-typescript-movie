import {
  CLIENT_COMPONENT_PATH,
  SHARED_COMPONENT_PATH
} from 'Shared/constants/paths';
import { ROUTE_GUIDE } from 'Shared/routers/routes';
import { RouteProps } from 'Shared/types/routeProps';
import { ROUTE_DEACTIVATED_ACCOUNT, ROUTE_TERMS } from './routes';

export const publicRoutes: RouteProps[] = [
  {
    path: ROUTE_GUIDE,
    componentPath: `${SHARED_COMPONENT_PATH}/GuideUI`,
    exact: true
  },
  {
    path: ROUTE_TERMS,
    componentPath: `${CLIENT_COMPONENT_PATH}/Terms`,
    exact: true
  },
  {
    path: ROUTE_DEACTIVATED_ACCOUNT,
    componentPath: `${CLIENT_COMPONENT_PATH}/DeactivatedAccount`,
    exact: true
  }
];
