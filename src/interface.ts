import * as constants from './constants';

export interface InterfaceAdd {
  type: constants.ADD_NEW_TODO;
  payload: Todo;
}

export interface InterfaceDelete {
  type: constants.DELETE_TODO;
  id: string;
}

export interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

export interface StoreState {
  allTodo: Todo[];
}

export type TodoState = StoreState;

export type UnionAction = InterfaceAdd | InterfaceDelete;
