import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {}

export interface State {
  code: string;
  password: string;
  confirmPassword: string;
  generalError?: string;
  email: string;
}
