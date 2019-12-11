import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {
  onClose(): void;
  onLogout(): void;
}

export interface State {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
