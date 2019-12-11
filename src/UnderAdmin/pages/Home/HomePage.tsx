import * as React from 'react';
import Layout from 'UnderAdmin/components/Layout/Layout';
import { reducer } from './reducer';
import { Props, State } from './types';

const initialState: State = {
  count: 0
};

const HomePage = (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Layout className='ua-home-page'>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => props.history.push('/login')}>Login</button>
    </Layout>
  );
};

export default HomePage;
