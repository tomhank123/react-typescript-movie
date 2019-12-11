import { Container } from 'inversify';
import { CognitoGateway, CognitoGatewayImpl } from './gateways/CognitoGateway';
import { UserGateway, UserGatewayImpl } from './gateways/UserGateway';
import { Util, UtilImpl } from './helpers/Utils';
import { AxiosProvider, AxiosProviderImpl } from './providers/AxiosProvider';
import { CookieProvider, CookieProviderImpl } from './providers/CookieProvider';
import {
  UserRepository,
  UserRepositoryImpl
} from './repositories/UserRepository';

export const container = new Container();

// Util
container
  .bind<Util>('util')
  .to(UtilImpl)
  .inSingletonScope();

// Provider
container
  .bind<AxiosProvider>('axiosProvider')
  .to(AxiosProviderImpl)
  .inSingletonScope();

container
  .bind<CookieProvider>('cookieProvider')
  .to(CookieProviderImpl)
  .inSingletonScope();

// User
container
  .bind<UserRepository>('userRepository')
  .to(UserRepositoryImpl)
  .inSingletonScope();
container
  .bind<UserGateway>('userGateway')
  .to(UserGatewayImpl)
  .inSingletonScope();

// Cognito
container
  .bind<CognitoGateway>('cognitoGateway')
  .to(CognitoGatewayImpl)
  .inSingletonScope();
