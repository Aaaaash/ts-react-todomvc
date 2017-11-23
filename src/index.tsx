import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { History } from 'history';
import { routerMiddleware }  from 'react-router-redux';

import TodoMVC from './container/TodoMVC';
import registerServiceWorker from './registerServiceWorker';
import todoReducer from './reducer';
import { TodoState } from './interface'; 
import './index.css';

const history: History = createHistory();
const middlewares: Middleware[] = [
  routerMiddleware(history),
];
const enhaner = applyMiddleware(...middlewares);

const store = createStore<TodoState>(todoReducer, { allTodo: [] }, enhaner);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <TodoMVC />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
