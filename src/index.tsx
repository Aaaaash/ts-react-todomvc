import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  Middleware,
  compose,
  GenericStoreEnhancer,
  Store,
} from 'redux';
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

const enhaners: GenericStoreEnhancer[] = [
  applyMiddleware(...middlewares),
];

const composeEnhancers: Function =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false,
  })
  : compose;

const initialState: object = {};

const store: Store<object> = createStore(
  reducers,
  initialState,
  composeEnhancers(...enhaners)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
