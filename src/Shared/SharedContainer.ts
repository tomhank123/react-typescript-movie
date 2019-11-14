import { Container } from "inversify";

import { UserGateway, UserGatewayImpl } from "./gateways/UserGateway";
import {
  UserRepository,
  UserRepositoryImpl
} from "./repositories/UserRepository";
import { CookieProvider, CookieProviderImpl } from "./providers/CookieProvider";
import { CognitoGateway, CognitoGatewayImpl } from "./gateways/CognitoGateway";

export const container = new Container();

// Provider
container
  .bind<CookieProvider>("cookieProvider")
  .to(CookieProviderImpl)
  .inSingletonScope();

// User
container
  .bind<UserRepository>("userRepository")
  .to(UserRepositoryImpl)
  .inSingletonScope();
container
  .bind<UserGateway>("userGateway")
  .to(UserGatewayImpl)
  .inSingletonScope();

// Cognito
container
  .bind<CognitoGateway>("cognitoGateway")
  .to(CognitoGatewayImpl)
  .inSingletonScope();
