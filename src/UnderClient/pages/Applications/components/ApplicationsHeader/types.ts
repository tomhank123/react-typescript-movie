import { ApplicationStatus } from 'Shared/constants/applicationStatus';

export interface Props {
  onChangeFilterStatus(status: ApplicationStatus): void;
}

export interface State {
  startDate?: any;
  endDate?: any;
  focusedInput?: any;
}
