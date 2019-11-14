import { PropsBase } from "Shared/types/propsBase";

export interface Props extends PropsBase {
}

export interface State {
  email: string;
  password: string;
  remember: boolean;
  generalError?: string;
}
