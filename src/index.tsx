import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'UnderAdmin/App';
import './scss/index.scss';

render((
  <Router>
    <App />
  </Router>
), document.getElementById('root') as HTMLElement);
