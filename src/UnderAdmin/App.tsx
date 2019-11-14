import * as React from "react";
import { Switch } from "react-router-dom";
import "reflect-metadata";
import { DependencyInjectionProvider } from "Shared/providers/DependencyInjectionProvider";
import { AuthenticatedRoute } from "Shared/routers/AuthenticatedRoute";
import { PublicRoute } from "Shared/routers/PublicRoute";
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_ALL_PROFILE
} from "Shared/routers/routes";
import { container } from "./Container";

const App = () => {
  return (
    <DependencyInjectionProvider container={container}>
      <Switch>
        <PublicRoute
          exact
          path={ROUTE_LOGIN}
          componentPath="Shared/pages/Login"
        />

        <AuthenticatedRoute
          exact
          path={ROUTE_HOME}
          componentPath="UnderAdmin/pages/Home"
        />

        <AuthenticatedRoute
          exact
          path={ROUTE_ALL_PROFILE}
          componentPath="Shared/pages/AllProfiles"
        />
      </Switch>
    </DependencyInjectionProvider>
  );
};

export default App;
