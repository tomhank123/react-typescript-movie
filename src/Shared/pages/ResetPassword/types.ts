import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {}

export interface State {
  password: string;
  confirmPassword: string;
  generalError?: string;
}
