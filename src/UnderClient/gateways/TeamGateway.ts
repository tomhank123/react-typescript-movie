import { injectable, inject } from 'inversify';
import { AxiosProvider } from 'Shared/providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import {
  RESEND_MEMBER_INVITATION_ENDPOINT,
  GET_TEAM_MEMBERS_ENDPOINT,
  SET_STATUS_MEMBERS_ENDPOINT,
  SET_ROLE_MEMBERS_ENDPOINT,
  RESEND_INVITE_MEMBERS_ENDPOINT,
  GET_DETAIL_MEMBERS_ENDPOINT,
  SET_PASSWORD_MEMBERS_ENDPOINT,
  UPDATE_PROFILE_MEMBERS_ENDPOINT
} from 'Shared/constants/apiEndpoints';
import { Util } from 'Shared/helpers/Utils';
import { GetTeamMemberRequest } from 'UnderClient/types/team/getTeamMemberRequest';
import { GetTeamMemberResponse } from 'UnderClient/types/team/getTeamMemberResponse';
import { SetMemberStatusRequest } from 'UnderClient/types/team/setMemberStatusRequest';
import { SetMemberRoleRequest } from 'UnderClient/types/team/setMemberRoleRequest';
import { ResendMemberInviteRequest } from 'UnderClient/types/team/resendMemberInviteRequest';
import { GetMemberDetailRequest } from 'UnderClient/types/team/getMemberDetailRequest';
import { GetMemberDetailResponse } from 'UnderClient/types/team/getMemberDetailResponse';
import { SetMemberPasswordRequest } from 'UnderClient/types/team/setMemberPasswordRequest';
import { UpdateMemberProfileRequest } from 'UnderClient/types/team/updateMemberProfileRequest';

export interface TeamGateway {
  sendEmailInvitation(
    companyId: string,
    request: { invitedEmail: string }
  ): Promise<boolean>;
  getTeamMembers(
    companyId: string,
    request: GetTeamMemberRequest
  ): Promise<GetTeamMemberResponse>;
  setMemberStatus(request: SetMemberStatusRequest): Promise<any>;
  setMemberRole(request: SetMemberRoleRequest): Promise<any>;
  resendInviteMember(request: ResendMemberInviteRequest): Promise<any>;
  getMemberDetail(
    request: GetMemberDetailRequest
  ): Promise<GetMemberDetailResponse>;
  setMemberPassword(request: SetMemberPasswordRequest): Promise<any>;
  updateProfileMember(request: UpdateMemberProfileRequest): Promise<any>;
}

@injectable()
export class TeamGatewayImpl implements TeamGateway {
  private readonly apiClient: AxiosInstance;

  constructor(
    @inject('axiosProvider') axiosProvider: AxiosProvider,
    @inject('util') private readonly util: Util
  ) {
    this.apiClient = axiosProvider.apiClient();
  }

  public sendEmailInvitation(
    companyId: string,
    request: { invitedEmail: string }
  ): Promise<boolean> {
    const endpoint = this.util.formatString(RESEND_MEMBER_INVITATION_ENDPOINT, {
      companyId
    });

    return this.apiClient.post(endpoint, { ...request });
  }

  public getTeamMembers(
    companyId: string,
    request: GetTeamMemberRequest
  ): Promise<GetTeamMemberResponse> {
    const endpoint = this.util.formatString(GET_TEAM_MEMBERS_ENDPOINT, {
      companyId
    });
    return this.apiClient
      .get(endpoint, { params: request })
      .then(response => response.data);
  }

  public setMemberStatus(request: SetMemberStatusRequest): Promise<any> {
    const endpoint = this.util.formatString(SET_STATUS_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    const requestStatus = { status: request.status };
    return this.apiClient.put(endpoint, requestStatus);
  }

  public setMemberRole(request: SetMemberRoleRequest): Promise<any> {
    const endpoint = this.util.formatString(SET_ROLE_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    const requestRole = { role: request.role };
    return this.apiClient.put(endpoint, requestRole);
  }

  public resendInviteMember(request: ResendMemberInviteRequest): Promise<any> {
    const endpoint = this.util.formatString(RESEND_INVITE_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    return this.apiClient.post(endpoint);
  }

  public getMemberDetail(
    request: GetMemberDetailRequest
  ): Promise<GetMemberDetailResponse> {
    const endpoint = this.util.formatString(GET_DETAIL_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    return this.apiClient.get(endpoint).then(response => response.data);
  }

  public setMemberPassword(request: SetMemberPasswordRequest): Promise<any> {
    const endpoint = this.util.formatString(SET_PASSWORD_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    const requestSend = { newPassword: request.newPassword };
    return this.apiClient
      .put(endpoint, requestSend)
      .then(response => response.data);
  }

  public updateProfileMember(
    request: UpdateMemberProfileRequest
  ): Promise<any> {
    const endpoint = this.util.formatString(UPDATE_PROFILE_MEMBERS_ENDPOINT, {
      companyId: request.companyId,
      memberId: request.memberId
    });
    delete request.companyId;
    delete request.memberId;
    return this.apiClient
      .put(endpoint, request)
      .then(response => response.data);
  }
}
