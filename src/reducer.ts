import { StoreState, UnionAction, Todo } from './interface';
import {
  ADD_NEW_TODO,
  DELETE_TODO,
} from './constants';

const initialState = {
  allTodo: [],
};

export function todoReducer(state: StoreState = initialState, action: UnionAction): StoreState {
  switch (action.type) {
    case ADD_NEW_TODO:
      return {
        ...state,
        allTodo: state.allTodo.concat([action.payload]),
      };
    case DELETE_TODO:
      return {
        ...state,
        allTodo: state.allTodo.filter((v: Todo) => v.id !== action.id),
      };
    default:
      return state;
  }
}

export default todoReducer;
