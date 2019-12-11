import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {}

export interface State {
  email: string;
  password: string;
  remember: boolean;
  generalError?: string;
}

export interface StatusMember {
  status: string;
  type: string;
}

export interface ErrorMember {
  messageInviteError: any[];
  messageInviteSuccess: any[];
}
