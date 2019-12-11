import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'Shared/pages/ErrorBoundary';
import App from 'UnderAdmin/App';
import './scss/index.scss';

render(
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>,
  document.getElementById('root') as HTMLElement
);
