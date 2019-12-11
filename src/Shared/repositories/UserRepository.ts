import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';
import { inject, injectable } from 'inversify';
import {
  ACCESS_TOKEN,
  SESSION_CODE,
  USER_COMPANY_NAME,
  USER_EMAIL,
  USER_FIRST_NAME,
  USER_INVITAION_CODE,
  USER_LAST_NAME,
  USER_PHONE,
  USER_VALIDATION_DATA,
  COMPANY_ID,
  USER_ROLE,
  USER_ID,
  USER_STATUS
} from 'Shared/constants/cookieKey';
import { CognitoGateway } from 'Shared/gateways/CognitoGateway';
import { UserGateway } from 'Shared/gateways/UserGateway';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { CognitoSignInRequest } from 'Shared/types/user/CognitoSignInRequest';
import { CognitoSignupRequest } from 'Shared/types/user/CognitoSignupRequest';
import { UserProfileTemporaryRequest } from 'Shared/types/user/UserProfileTemporaryRequest';
import { Util } from 'Shared/helpers/Utils';
import { GetInfoInvitationResponse } from 'Shared/types/user/GetInfoInvitationResponse';
const get = require('lodash/get');

export interface UserRepository {
  signIn(request: CognitoSignInRequest): Promise<CognitoUser | string>;
  signUp(request: CognitoSignupRequest): Promise<ISignUpResult | string>;
  resendVerifyEmailCode(username: string): Promise<string>;
  verifyEmailCode(username: string, code: string): Promise<any>;
  logOut(): Promise<boolean>;
  sendProfile(): Promise<string>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  forgotPassword(request: string): Promise<any>;
  forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<any>;
  clearUserInfo(): void;
  getInfoInvitation(id: string): Promise<GetInfoInvitationResponse>;
  checkExistEmail(email: string): Promise<boolean>;
  getProfile(): Promise<any>;
  currentSession(): Promise<any>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject('cognitoGateway') private readonly cognitoGateway: CognitoGateway,
    @inject('cookieProvider') private readonly cookieProvider: CookieProvider,
    @inject('userGateway') private readonly userGateway: UserGateway,
    @inject('util') private readonly util: Util
  ) {}

  public async signUp(
    request: CognitoSignupRequest
  ): Promise<ISignUpResult | string> {
    return this.cognitoGateway.signUp(request).then(user => {
      this.cookieProvider.set(USER_VALIDATION_DATA, 'true');

      return user;
    });
  }

  public async verifyEmailCode(username: string, code: string): Promise<any> {
    return this.cognitoGateway.activeUser(username, code).then(response => {
      this.clearUserInfo();

      return response;
    });
  }

  public resendVerifyEmailCode(username: string): Promise<string> {
    return this.cognitoGateway.resendActive(username);
  }

  public async signIn(
    request: CognitoSignInRequest
  ): Promise<CognitoUser | string> {
    let result = null;
    try {
      const user = await this.cognitoGateway.signIn(request);
      const infoUser = await this.cognitoGateway.currentSession();
      this.cookieProvider.set(ACCESS_TOKEN, infoUser.idToken.jwtToken);

      const userProfile = await this.getProfile();

      this.cookieProvider.set(
        COMPANY_ID,
        get(userProfile, 'members[0].companyId', '')
      );
      this.cookieProvider.set(
        USER_FIRST_NAME,
        get(userProfile, 'firstName', '')
      );
      this.cookieProvider.set(USER_LAST_NAME, get(userProfile, 'lastName', ''));
      this.cookieProvider.set(
        USER_ROLE,
        get(userProfile, 'members[0].role', '')
      );
      this.cookieProvider.set(USER_EMAIL, get(userProfile, 'workEmail', ''));

      this.cookieProvider.set(
        USER_STATUS,
        get(userProfile, 'members[0].status', '')
      );
      this.cookieProvider.set(
        USER_COMPANY_NAME,
        get(userProfile, 'members[0].companyName', '')
      );
      this.cookieProvider.set(USER_ID, get(userProfile, 'id', ''));

      result = user;
    } catch (error) {
      if (error.name === 'UserNotConfirmedException') {
        result = error.name;
        this.cookieProvider.set(USER_EMAIL, request.username);
        this.cookieProvider.set(USER_VALIDATION_DATA, 'true');
      } else {
        throw error;
      }
    }
    return result;
  }

  public async logOut(): Promise<boolean> {
    return this.cognitoGateway.logOut().then(() => {
      this.util.clearAllCookie();
      return true;
    });
  }

  public sendProfile(): Promise<string> {
    const userProfileTemporaryRequest: UserProfileTemporaryRequest = {
      companyName: this.cookieProvider.get(USER_COMPANY_NAME),
      workEmail: this.cookieProvider.get(USER_EMAIL),
      firstName: this.cookieProvider.get(USER_FIRST_NAME),
      lastName: this.cookieProvider.get(USER_LAST_NAME),
      phoneNumber: this.cookieProvider.get(USER_PHONE)
    };

    const invitationCode = this.cookieProvider.get(USER_INVITAION_CODE);
    if (invitationCode) {
      userProfileTemporaryRequest.invitationCode = invitationCode;
    }

    return this.userGateway.sendProfile(userProfileTemporaryRequest);
  }

  public getProfile(): Promise<any> {
    return this.userGateway.getProfile();
  }

  public getInfoInvitation(id: string): Promise<GetInfoInvitationResponse> {
    return this.userGateway.getInfoInvitation(id);
  }

  public checkExistEmail(email: string): Promise<boolean> {
    return this.userGateway.checkExistEmail(email).catch(error => error);
  }

  public changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    return this.cognitoGateway.changePassword(oldPassword, newPassword);
  }

  public async forgotPassword(request: string) {
    return this.cognitoGateway.forgotPassword(request);
  }

  public async forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<any> {
    return this.cognitoGateway.forgotPasswordSubmit(username, code, password);
  }

  public currentSession(): Promise<any> {
    return this.cognitoGateway.currentSession();
  }

  public clearUserInfo() {
    this.cookieProvider.multiDelete([
      ACCESS_TOKEN,
      USER_EMAIL,
      USER_PHONE,
      USER_FIRST_NAME,
      USER_LAST_NAME,
      USER_COMPANY_NAME,
      USER_VALIDATION_DATA,
      SESSION_CODE
    ]);
  }
}
