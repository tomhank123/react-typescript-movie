import Amplify from 'aws-amplify';

export default class AppConfig {
  public constructor() {}

  public init() {
    this.initCognitoConfig();
  }

  private initCognitoConfig() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID
      },
      API: {
        endpoints: [
          {
            name: process.env.COGNITO_NAME_GATEWAY,
            endpoint: process.env.COGNITO_URL,
            region: process.env.COGNITO_REGION
          }
        ]
      }
    });
  }
}
