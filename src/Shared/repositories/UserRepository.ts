import { inject, injectable } from "inversify";
import { ACCESS_TOKEN } from "Shared/constants/cookieKey";
import { UserGateway } from "Shared/gateways/UserGateway";
import { CookieProvider } from "Shared/providers/CookieProvider";
import { CognitoUser } from "Shared/types/user/CognitoUser";

export interface UserRepository {
  isLogged(): Promise<boolean>;
  login(): Promise<CognitoUser>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject("userGateway") private readonly userGateway: UserGateway,
    @inject("cookieProvider") private readonly cookieProvider: CookieProvider
  ) {}

  public async isLogged(): Promise<boolean> {
    return true;
  }

  public async login(): Promise<CognitoUser> {
    const user = await this.userGateway.login();

    this.cookieProvider.set(ACCESS_TOKEN, user.email);

    return user;
  }
}
