import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {}

export interface State {
  workEmail: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
  companyName: string;
}
