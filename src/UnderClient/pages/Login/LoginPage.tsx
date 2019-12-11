import * as React from 'react';
import { default as LoginComponent } from 'Shared/pages/Login';
import { PropsBase } from 'Shared/types/propsBase';
import { ROUTE_OVERVIEW } from 'UnderClient/routers/routes';

const LoginPage = (props: PropsBase) => {
  return <LoginComponent {...props} authorizedRedirectRoute={ROUTE_OVERVIEW} />;
};

export default LoginPage;
