import * as React from 'react';
import { PureComponent, ReactNode, KeyboardEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState, Todo, UnionAction } from '../interface';
import { addNewTodo, deleteTodo } from '../actions';
import guid from './guid';

export interface Props {
  allTodo: Todo[];
  addNewTodoAction: (todo: Todo) => void;
  deleteTodoAction: (id: string) => void;
};

export interface State {
  inputValue: string;
}

class TodoMVC extends PureComponent<Props, State> {
  state = {
    inputValue: '',
  }
  handleChange = (e: any): void => {
    this.setState({
      inputValue: e.target.value,
    });
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
    const { allTodo } = this.props;
    return allTodo.map((v: Todo): ReactNode => (
      <li className={v.isComplete ? 'completed' : ''} key={v.id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={v.isComplete} />
          <label>Taste JavaScript</label>
          <button className="destroy"></button>
        </div>
        <input className="edit" value="Create a TodoMVC template" />
      </li>
    ));
  }
  render(): ReactNode {
    const { inputValue } = this.state;
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
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.renderTodos()}
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  allTodo: state.allTodo,
});

const mapDispatchToProps = (dispatch: Dispatch<UnionAction>) => ({
  addNewTodoAction: (todo: Todo) => dispatch(addNewTodo(todo)),
  deleteTodoAction: (id: string) => dispatch(deleteTodo(id)),
});

export function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}
export default connect(mapStateToProps, mapDispatchToProps, mergePropss)(TodoMVC);
