import * as React from 'react';
import { PureComponent, ReactNode, KeyboardEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState, Todo, UnionAction } from '../interface';
import {
  addNewTodo,
  deleteTodo,
  setCompleteState,
  setAllState,
  clearComplete,
} from '../actions';
import guid from '../utils/guid';
import getQueryString from '../utils/getQueryString';

export interface Props {
  allTodo: Todo[];
  addNewTodoAction: (todo: Todo) => void;
  deleteTodoAction: (id: string) => void;
  handleSetState: (id: string) => void;
  handleSwitchAll: () => void;
  handleClearComplete: () => void;
  [propName: string]: any;
};

export interface State {
  inputValue: string;
}

class TodoMVC extends PureComponent<Props, State> {
  state = {
    inputValue: '',
  }

  handleChange = (e: any): void => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputEnter = (e: KeyboardEvent<any>): void => {
    if (e.keyCode === 13 || e.keyCode === 108) {
      const { addNewTodoAction } = this.props;
      const { inputValue } = this.state;
      addNewTodoAction({
        text: inputValue,
        isComplete: false,
        id: guid(),
      });
      this.setState({ inputValue: '' });
    }
  }

  renderTodos = (): ReactNode[] => {
    const { allTodo, handleSetState, deleteTodoAction } = this.props;
    const queryType = getQueryString('type');
    const filterTodos =
      queryType === 'active' ?
      allTodo.filter((v: Todo) => !v.isComplete) :
      queryType === 'completed' ?
      allTodo.filter((v: Todo) => !!v.isComplete) : allTodo;
    return filterTodos.map((v: Todo): ReactNode => (
      <li className={v.isComplete ? 'completed' : ''} key={v.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={v.isComplete}
            onChange={() => handleSetState(v.id)}
          />
          <label>{v.text}</label>
          <button
            className="destroy"
            onClick={() => deleteTodoAction(v.id)}
          />
        </div>
      </li>
    ));
  }

  render(): ReactNode {
    const { inputValue } = this.state;
    const { handleSwitchAll, handleClearComplete } = this.props;
    const queryType: string = getQueryString('type');
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={inputValue}
            onChange={this.handleChange}
            onKeyDown={this.handleInputEnter}
          />
        </header>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
          />
          <label
            onClick={handleSwitchAll}
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <ul className="todo-list">
            {this.renderTodos()}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item left</span>
          <ul className="filters">
            <li>
              <Link
                className={ queryType === '' || queryType === 'all' ? 'selected' : '' }
                to="/?type=all"
              >
                All
              </Link>
            </li>
            <li>
              <Link
                className={ queryType === 'active' ? 'selected' : '' }
                to="/?type=active"
              >
                Active
              </Link>
            </li>
            <li>
              <Link
                className={ queryType === 'completed' ? 'selected' : '' }
                to="/?type=completed"
              >
                Completed
              </Link>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={handleClearComplete}
          >
            Clear completed
          </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  allTodo: state.todos.allTodo,
});

const mapDispatchToProps = (dispatch: Dispatch<UnionAction>) => ({
  addNewTodoAction: (todo: Todo) => dispatch(addNewTodo(todo)),
  deleteTodoAction: (id: string) => dispatch(deleteTodo(id)),
  handleSetState: (id: string) => dispatch(setCompleteState(id)),
  handleSwitchAll: () => dispatch(setAllState()),
  handleClearComplete: () => dispatch(clearComplete()),
});

export function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}
export default connect(mapStateToProps, mapDispatchToProps, mergePropss)(TodoMVC);
