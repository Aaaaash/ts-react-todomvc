import * as constants from './constants';

export interface InterfaceAdd {
  type: constants.ADD_NEW_TODO;
  payload: Todo;
}

export interface InterfaceDelete {
  type: constants.DELETE_TODO;
  id: string;
}

export interface InterfaceSetState {
  type: constants.CHECK_COMPLETE_STATE;
  id: string;
}

export interface InterfaceAll {
  type: constants.ALL_SWITCH_STATE,
}

export interface InterfaceClear {
  type: constants.CLEAR_COMPLETE,
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

export type UnionAction = InterfaceAdd | InterfaceDelete | InterfaceSetState | InterfaceAll | InterfaceClear;
