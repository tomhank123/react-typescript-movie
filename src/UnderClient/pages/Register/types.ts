import { RouteComponentProps } from 'react-router';
export interface Props extends RouteComponentProps<any> {}

export interface State {
  companyName: string;
  workEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
}
