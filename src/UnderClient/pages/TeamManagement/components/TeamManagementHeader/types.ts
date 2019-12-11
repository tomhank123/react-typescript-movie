import { UserStatus } from 'Shared/constants/userStatus';

export interface Props {
  totalMembers: number;
  onChangeFilterStatus(status: UserStatus): void;
  onChangeKeyword(keyword: string): void;
}

export interface State {}
