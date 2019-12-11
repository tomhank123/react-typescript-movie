import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {}

export interface State {
  email: string;
  generalError?: string;
}
