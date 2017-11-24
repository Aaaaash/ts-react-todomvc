import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { History } from 'history';
import { routerMiddleware }  from 'react-router-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducer';
import './index.css';

const history: History = createHistory();
const middlewares: Middleware[] = [
  routerMiddleware(history),
];
const enhaner = applyMiddleware(...middlewares);

const initialState = {};
const store = createStore(reducers, initialState, enhaner);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
