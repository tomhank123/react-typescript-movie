export interface GetTeamMemberResponse {
  items: GetTeamMemberItemResponse[];
  totalCount: number;
}

export interface GetTeamMemberItemResponse {
  createdAt: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status: string;
  type: string;
  updatedAt: string;
  role?: string;
  id: string;
}
