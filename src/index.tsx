import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoMVC from './container/TodoMVC';
import registerServiceWorker from './registerServiceWorker';
import todoReducer from './reducer';
import { TodoState } from './interface';
import './index.css';

const store = createStore<TodoState>(todoReducer);

ReactDOM.render(
  <Provider store={store}>
    <TodoMVC
      allTodo={[]}
      addNewTodoAction={() => {}}
      deleteTodoAction={() => {}}
      handleSetState={() => {}}
      handleSwitchAll={() => {}}
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
