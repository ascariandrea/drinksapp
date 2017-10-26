import * as React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createHashHistory } from 'history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import drinksApp from './reducers';
import './index.css';

const history = createHashHistory();
const store = createStore(drinksApp, applyMiddleware(routerMiddleware(history)));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
