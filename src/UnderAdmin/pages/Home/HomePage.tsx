import * as React from "react";
import { withRouter } from "react-router";
import { initialState } from ".";
import { reducer } from "./reducer";
import { Props } from "./types";
import Layout from "Shared/components/Layout/Layout";

const HomePage = (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Layout>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => props.history.push("/login")}>Login</button>
    </Layout>
  );
};

export default withRouter(HomePage);
