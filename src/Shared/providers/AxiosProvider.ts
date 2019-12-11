import Axios, { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import { AUTHORIZATION } from 'Shared/constants/headerKeys';
import { Auth } from 'aws-amplify';
const get = require('lodash/get');

export interface AxiosProvider {
  apiClient(): AxiosInstance;
}

import { ROUTE_LOGIN } from 'Shared/routers/routes';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { Util } from 'Shared/helpers/Utils';
import { CookieProvider } from './CookieProvider';
import { ACCESS_TOKEN } from '../constants/cookieKey';

@injectable()
export class AxiosProviderImpl implements AxiosProvider {
  private readonly axiosApiClient: AxiosInstance;
  private isAlreadyFetchingAccessToken: boolean = false;
  private subscribers: any[] = [];
  constructor(
    @inject('util') private readonly util: Util,
    @inject('cookieProvider') private readonly cookieProvider: CookieProvider
  ) {
    this.axiosApiClient = this.initApiClient();
  }

  private addSubscriber(callback: any): any {
    this.subscribers.push(callback);
  }

  private onAccessTokenFetched(access_token: any): any {
    this.subscribers = this.subscribers.filter(callback =>
      callback(access_token)
    );
  }

  private initApiClient(): AxiosInstance {
    const axiosInstance = Axios.create({
      baseURL: process.env.API_ENDPOINT,
      timeout: 60 * 1000,
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: (data, headers) => {
        headers[AUTHORIZATION] = this.cookieProvider.get(ACCESS_TOKEN);

        return JSON.stringify(data);
      }
    });

    axiosInstance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: { config: any }) => {
        const { config } = error;
        const status = get(error, 'response.status', 500);
        const originalRequest = config;
        if (status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken()
              .then(accessToken => {
                this.isAlreadyFetchingAccessToken = false;
                this.onAccessTokenFetched(accessToken.idToken.jwtToken);
              })
              .catch(error => {
                return Promise.reject(error);
              });
          } else {
            useAlert
              .fire({
                icon: 'error',
                title: 'Oops...',
                html: `Token expired`,
                showConfirmButton: true,
                confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
              })
              .then(() => {
                Auth.signOut().then(() => {
                  this.util.clearAllCookie();
                  window.location.href = ROUTE_LOGIN;
                });
              });
            return Promise.reject(error);
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber((accessToken: string) => {
              this.cookieProvider.set(ACCESS_TOKEN, accessToken);
              resolve(this.initApiClient().request(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }

  public apiClient(): AxiosInstance {
    return this.axiosApiClient;
  }

  private refreshToken(): Promise<any> {
    return Auth.currentCredentials().then(() => {
      return Auth.currentSession();
    });
  }
}
