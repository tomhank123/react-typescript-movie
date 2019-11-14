import { injectable } from "inversify";
import { CognitoUser } from "Shared/types/user/CognitoUser";

export interface UserGateway {
  login(): Promise<CognitoUser>;
}

@injectable()
export class UserGatewayImpl implements UserGateway {
  public async login(): Promise<CognitoUser> {
    return {
      name: "Nho Huynh",
      email: "nhohb@devblock.net"
    };
  }
}
