import * as constants from './constants';

import {
  InterfaceAdd,
  InterfaceDelete,
  InterfaceSetState,
  InterfaceAll,
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

export function setCompleteState(id: string): InterfaceSetState {
  return {
    type: constants.CHECK_COMPLETE_STATE,
    id,
  }
}

export function setAllState(): InterfaceAll {
  return {
    type: constants.ALL_SWITCH_STATE,
  }
}
