import { StoreState, UnionAction, Todo } from './interface';
import {
  ADD_NEW_TODO,
  DELETE_TODO,
  CHECK_COMPLETE_STATE,
  ALL_SWITCH_STATE,
  CLEAR_COMPLETE,
} from './constants';

const initialState = {
  allTodo: [],
};

let lastSwitch = true;

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
    case CHECK_COMPLETE_STATE:
      return {
        ...state,
        allTodo: state.allTodo.map((v: Todo) => {
          if (v.id === action.id) {
            v.isComplete = !v.isComplete;
          }
          return v;
        }),
      };
    case ALL_SWITCH_STATE:
      const newTodos = state.allTodo.map((v: Todo) => {
        v.isComplete = lastSwitch;
        return v;
      });
      lastSwitch = !lastSwitch;
      return { ...state, allTodo: newTodos };
    case CLEAR_COMPLETE:
      return { ...state, allTodo: state.allTodo.filter((v) => !v.isComplete) };
    default:
      return state;
  }
}

export default todoReducer;
