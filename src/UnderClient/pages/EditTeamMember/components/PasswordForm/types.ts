import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {
  onClose: () => void;
}
export interface State {
  newPassword: string;
  confirmPassword: string;
}
