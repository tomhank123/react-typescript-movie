import {
  CLIENT_COMPONENT_PATH,
  SHARED_COMPONENT_PATH
} from 'Shared/constants/paths';
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_LOGIN,
  ROUTE_RESET_PASSWORD,
  ROUTE_VERIFY_EMAIL,
  ROUTE_VERIFY_RESET_PASSWORD
} from 'Shared/routers/routes';
import { RouteProps } from 'Shared/types/routeProps';
import { ROUTE_REGISTER, ROUTE_REGISTER_PARAM } from './routes';

export const unauthenticatedRoutes: RouteProps[] = [
  {
    path: ROUTE_LOGIN,
    componentPath: `${CLIENT_COMPONENT_PATH}/Login`,
    exact: true
  },
  {
    path: ROUTE_FORGOT_PASSWORD,
    componentPath: `${SHARED_COMPONENT_PATH}/ForgotPassword`,
    exact: true
  },
  {
    path: ROUTE_VERIFY_RESET_PASSWORD,
    componentPath: `${SHARED_COMPONENT_PATH}/VerifyResetPassword`,
    exact: true
  },
  {
    path: ROUTE_RESET_PASSWORD,
    componentPath: `${SHARED_COMPONENT_PATH}/ResetPassword`,
    exact: true
  },
  {
    path: ROUTE_REGISTER,
    componentPath: `${CLIENT_COMPONENT_PATH}/Register`,
    exact: true
  },
  {
    path: ROUTE_REGISTER_PARAM,
    componentPath: `${CLIENT_COMPONENT_PATH}/Register`,
    exact: true
  },
  {
    path: ROUTE_VERIFY_EMAIL,
    componentPath: `${CLIENT_COMPONENT_PATH}/VerifyEmail`,
    exact: true
  }
];
