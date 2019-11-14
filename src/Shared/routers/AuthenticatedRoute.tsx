import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "Shared/constants/cookieKey";
import { CookieProvider } from "Shared/providers/CookieProvider";
import { useInjection } from "Shared/providers/DependencyInjectionProvider";
import { ROUTE_LOGIN } from "Shared/routers/routes";
import { RouteProps } from "Shared/types/routeProps";

export const AuthenticatedRoute = (props: RouteProps) => {
  const cookieProvider = useInjection<CookieProvider>("cookieProvider");

  const { path, componentPath, exact = true } = props;

  if (!cookieProvider.has(ACCESS_TOKEN)) {
    return <Redirect to={{ pathname: ROUTE_LOGIN }} />;
  }

  const ComponentRoute = React.lazy(() => import(`src/${componentPath}`));

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ComponentRoute />
        </React.Suspense>
      )}
    />
  );
};
