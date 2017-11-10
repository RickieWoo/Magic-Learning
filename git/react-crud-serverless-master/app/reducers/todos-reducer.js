import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  todos: []
};

const todosReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_TODOS_SUCCESS:
      return Object.assign({}, state, { todos: action.todos });

    case types.DELETE_TODOS_SUCCESS:

      // Use lodash to create a new widget array without the widget we want to remove
      const newTodos = _.filter(state.todos, todos => todos.id != action.todosId);
      return Object.assign({}, state, { todos: newTodos })

  }

  return state;

}

export default todosReducer;
