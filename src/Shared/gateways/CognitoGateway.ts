import { injectable } from "inversify";
import { CognitoUser } from "Shared/types/user/CognitoUser";

export interface CognitoGateway {
  register(email: string, password: string): Promise<CognitoUser>;
  login(email: string, password: string): Promise<CognitoUser>;
  logout(): Promise<boolean>;
}

@injectable()
export class CognitoGatewayImpl implements CognitoGateway {
  public async register(email: string, password: string): Promise<CognitoUser> {
    return {
      name: "Nho Huynh",
      email: "nhohb@devblock.net"
    };
  }

  public async login(email: string, password: string): Promise<CognitoUser> {
    return {
      name: "Nho Huynh",
      email: "nhohb@devblock.net"
    };
  }

  public async logout(): Promise<boolean> {
    return true;
  }
}
