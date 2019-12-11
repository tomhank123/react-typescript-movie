import { injectable, inject } from 'inversify';
import { AxiosProvider } from 'Shared/providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import { UserProfileTemporaryRequest } from 'Shared/types/user/UserProfileTemporaryRequest';
import {
  CREATE_TEMP_PROFILE_ENDPOINT,
  INVITATION_MEMBER_ENDPOINT,
  EXIST_EMAIL_ENDPOINT,
  GET_PROFILE
} from 'Shared/constants/apiEndpoints';
import { Util } from 'Shared/helpers/Utils';
import { GetInfoInvitationResponse } from 'Shared/types/user/GetInfoInvitationResponse';

export interface UserGateway {
  sendProfile(request: UserProfileTemporaryRequest): Promise<string>;
  getInfoInvitation(id: string): Promise<GetInfoInvitationResponse>;
  checkExistEmail(email: string): Promise<boolean>;
  getProfile(): Promise<any>;
}

@injectable()
export class UserGatewayImpl implements UserGateway {
  private readonly apiClient: AxiosInstance;

  constructor(
    @inject('axiosProvider') axiosProvider: AxiosProvider,
    @inject('util') private readonly util: Util
  ) {
    this.apiClient = axiosProvider.apiClient();
  }

  public sendProfile(request: UserProfileTemporaryRequest): Promise<string> {
    return this.apiClient
      .post(CREATE_TEMP_PROFILE_ENDPOINT, { ...request })
      .then(response => response.data.profileId);
  }

  public async checkExistEmail(email: string): Promise<boolean> {
    const endpoint = this.util.formatString(EXIST_EMAIL_ENDPOINT, { email });

    try {
      await this.apiClient.get(endpoint);
      return true;
    } catch (e) {
      return false;
    }
  }

  public getProfile(): Promise<any> {
    return this.apiClient.get(GET_PROFILE).then(response => response.data.data);
  }

  public getInfoInvitation(id: string): Promise<GetInfoInvitationResponse> {
    const endpoint = this.util.formatString(INVITATION_MEMBER_ENDPOINT, { id });

    return this.apiClient.get(endpoint).then(response => response.data.data);
  }
}
