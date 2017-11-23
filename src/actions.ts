import * as constants from './constants';

import {
  InterfaceAdd,
  InterfaceDelete,
  Todo,
} from './interface';

export function addNewTodo(payload: Todo): InterfaceAdd {
  return {
    type: constants.ADD_NEW_TODO,
    payload,
  }
}

export function deleteTodo(id: string): InterfaceDelete {
  return {
    type: constants.DELETE_TODO,
    id,
  }
}
