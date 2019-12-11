import { UserStatus } from 'Shared/constants/userStatus';

export interface GetTeamMemberRequest {
  role: string;
  status?: UserStatus;
  type: string;
  q: string;
  sort: string;
  order: string;
  page: number;
  pageSize: number;
}
