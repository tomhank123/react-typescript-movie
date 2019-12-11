import { inject, injectable } from 'inversify';
import { GetTeamMemberRequest } from 'UnderClient/types/team/getTeamMemberRequest';
import { GetTeamMemberResponse } from 'UnderClient/types/team/getTeamMemberResponse';
import { TeamGateway } from 'UnderClient/gateways/TeamGateway';
import { SetMemberStatusRequest } from 'UnderClient/types/team/setMemberStatusRequest';
import { SetMemberRoleRequest } from 'UnderClient/types/team/setMemberRoleRequest';
import { ResendMemberInviteRequest } from 'UnderClient/types/team/resendMemberInviteRequest';
import { GetMemberDetailRequest } from 'UnderClient/types/team/getMemberDetailRequest';
import { GetMemberDetailResponse } from 'UnderClient/types/team/getMemberDetailResponse';
import { SetMemberPasswordRequest } from 'UnderClient/types/team/setMemberPasswordRequest';
import { UpdateMemberProfileRequest } from 'UnderClient/types/team/updateMemberProfileRequest';

export interface TeamRepository {
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
export class TeamRepositoryImpl implements TeamRepository {
  constructor(
    @inject('teamGateway') private readonly teamGateway: TeamGateway
  ) {}

  public async sendEmailInvitation(
    companyId: string,
    request: { invitedEmail: string }
  ): Promise<boolean> {
    try {
      await this.teamGateway.sendEmailInvitation(companyId, request);
      return true;
    } catch (e) {
      return false;
    }
  }

  public getTeamMembers(
    companyId: string,
    request: GetTeamMemberRequest
  ): Promise<GetTeamMemberResponse> {
    return this.teamGateway.getTeamMembers(companyId, request);
  }

  public setMemberStatus(request: SetMemberStatusRequest): Promise<any> {
    return this.teamGateway.setMemberStatus(request);
  }

  public setMemberRole(request: SetMemberRoleRequest): Promise<any> {
    return this.teamGateway.setMemberRole(request);
  }

  public resendInviteMember(request: ResendMemberInviteRequest): Promise<any> {
    return this.teamGateway.resendInviteMember(request);
  }

  public getMemberDetail(
    request: GetMemberDetailRequest
  ): Promise<GetMemberDetailResponse> {
    return this.teamGateway.getMemberDetail(request);
  }

  public setMemberPassword(request: SetMemberPasswordRequest): Promise<any> {
    return this.teamGateway
      .setMemberPassword(request)
      .then(response => (response ? response : true))
      .catch(error => {
        return false;
      });
  }

  public updateProfileMember(
    request: UpdateMemberProfileRequest
  ): Promise<any> {
    return this.teamGateway.updateProfileMember(request);
  }
}
