import * as React from "react";
import { Route } from "react-router-dom";
import { RouteProps } from "Shared/types/routeProps";

export const PublicRoute = (props: RouteProps) => {
  const { path, componentPath, exact = true } = props;

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
