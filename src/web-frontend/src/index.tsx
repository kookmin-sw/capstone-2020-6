import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import "./index.css"

// for Mobx
import { Provider } from 'mobx-react';
import stores from './stores';

ReactDOM.render(
  // <React.StrictMode>
  <Provider {...stores}>
    <Router />
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
