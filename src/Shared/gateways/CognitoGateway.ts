import { CognitoUser } from 'amazon-cognito-identity-js';
import { API, Auth } from 'aws-amplify';
import { injectable } from 'inversify';
import { CREATE_COGNITO_PROFILE_ENDPOINT } from 'Shared/constants/cognitoEndpoints';
import { CognitoSignInRequest } from 'Shared/types/user/CognitoSignInRequest';
import { CognitoSignupRequest } from 'Shared/types/user/CognitoSignupRequest';
import { CognitoSignupResponse } from 'Shared/types/user/CognitoSignupResponse';
import { UserProfileTemporaryRequest } from 'Shared/types/user/UserProfileTemporaryRequest';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';

export interface CognitoGateway {
  signUp(request: CognitoSignupRequest): Promise<CognitoSignupResponse>;
  signIn(request: CognitoSignInRequest): Promise<CognitoUser>;
  activeUser(username: string, code: string): Promise<any>;
  resendActive(username: string): Promise<string>;
  logOut(): Promise<any>;
  currentSession(): Promise<any>;
  sendProfile(request: UserProfileTemporaryRequest): Promise<any>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  currentAuthenticatedUser(): Promise<CognitoUser | any>;
  forgotPassword(request: string): Promise<any>;
  forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<any>;
}

@injectable()
export class CognitoGatewayImpl implements CognitoGateway {
  public signUp(request: CognitoSignupRequest): Promise<CognitoSignupResponse> {
    const { email, password, sessionCode } = request;

    const signUpRequest: SignUpParams = {
      username: email,
      password,
      attributes: {
        email,
        'custom:sessionCode': sessionCode
      }
    };

    return Auth.signUp(signUpRequest);
  }

  public signIn(request: CognitoSignInRequest): Promise<CognitoUser> {
    return Auth.signIn(request);
  }

  public activeUser(username: string, code: string): Promise<any> {
    return Auth.confirmSignUp(username, code);
  }

  public resendActive(username: string): Promise<string> {
    return Auth.resendSignUp(username);
  }

  public logOut(): Promise<any> {
    return Auth.signOut();
  }

  public currentSession(): Promise<any> {
    return Auth.currentSession();
  }

  public sendProfile(request: UserProfileTemporaryRequest): Promise<any> {
    return API.post(
      process.env.COGNITO_NAME_GATEWAY,
      CREATE_COGNITO_PROFILE_ENDPOINT,
      request
    );
  }

  public forgotPassword(request: string): Promise<any> {
    return Auth.forgotPassword(request);
  }

  public currentAuthenticatedUser(): Promise<CognitoUser | any> {
    return Auth.currentAuthenticatedUser();
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await this.currentAuthenticatedUser();

    try {
      await Auth.changePassword(user, oldPassword, newPassword);
      return true;
    } catch (e) {
      return false;
    }
  }

  public forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, password);
  }
}
