import { CLIENT_COMPONENT_PATH } from 'Shared/constants/paths';
import { RouteProps } from 'Shared/types/routeProps';
import {
  ROUTE_EDIT_ACCOUNT,
  ROUTE_OVERVIEW,
  ROUTE_MEMBER_EDITED,
  ROUTE_TEAM_MANAGEMENT
} from './routes';
import { ROUTE_APPLICATIONS } from 'Shared/routers/routes';

export const authenticatedRoutes: RouteProps[] = [
  {
    path: ROUTE_TEAM_MANAGEMENT,
    componentPath: `${CLIENT_COMPONENT_PATH}/TeamManagement`,
    exact: true
  },
  {
    path: ROUTE_MEMBER_EDITED,
    componentPath: `${CLIENT_COMPONENT_PATH}/EditTeamMember`,
    exact: true
  },
  {
    path: ROUTE_OVERVIEW,
    componentPath: `${CLIENT_COMPONENT_PATH}/Overview`,
    exact: true
  },
  {
    path: ROUTE_EDIT_ACCOUNT,
    componentPath: `${CLIENT_COMPONENT_PATH}/EditAccount`,
    exact: true
  },
  {
    path: ROUTE_APPLICATIONS,
    componentPath: `${CLIENT_COMPONENT_PATH}/Applications`,
    exact: true
  }
];
