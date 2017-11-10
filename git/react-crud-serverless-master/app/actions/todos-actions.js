import * as types from '../actions/action-types';

export function getTodosSuccess(todos) {
  return {
    type: types.GET_TODOS_SUCCESS,
    todos
  };
}

export function deleteTodosSuccess(todosId) {
  return {
    type: types.DELETE_TODOS_SUCCESS,
    todosId
  };
}
