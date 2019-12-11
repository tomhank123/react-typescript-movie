import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { RouteProps } from 'Shared/types/routeProps';
import { Spinner } from 'Shared/components/Spinner';

export const BaseRoute = (props: RouteProps) => {
  const { path, componentPath, exact = true } = props;
  const ComponentRoute = React.lazy(() => import(`src/${componentPath}`));
  const ComponentWithRouter = withRouter(ComponentRoute);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <React.Suspense fallback={<Spinner open={true} />}>
          <ComponentWithRouter />
        </React.Suspense>
      )}
    />
  );
};

export default BaseRoute;
