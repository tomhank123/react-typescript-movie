import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {
  authorizedRedirectRoute: string;
}

export interface State {
  email: string;
  password: string;
  generalError?: string;
}
