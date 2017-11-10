import axios from 'axios';
import store from '../store';
import { getWidgetsSuccess, deleteWidgetSuccess } from '../actions/widget-actions';
import { getTodosSuccess, deleteTodosSuccess } from '../actions/todos-actions';

/**
 * Get widgets
 */

export function getTodos() {
  return axios.get('https://m7s0kugbb6.execute-api.us-east-1.amazonaws.com/dev/todos')
    .then(response => {
      store.dispatch(getTodosSuccess(response.data));
      return response;
    });
}

/**
 * Search Widgets
 */

export function searchTodos(query = '') {
  return axios.get('http://localhost:3001/todos?q='+ query)
    .then(response => {
      store.dispatch(getTodosSuccess(response.data));
      return response;
    });
}

/**
 * Delete a widget
 */

/*export function deleteWidget(widgetId) {
  return axios.delete('http://localhost:3001/widgets/' + widgetId)
    .then(response => {
      store.dispatch(deleteWidgetSuccess(widgetId));
      return response;
    });
}*/


/**
 * Delete a widget
 */

export function deleteTodos(todosId) {
    return axios.delete('https://m7s0kugbb6.execute-api.us-east-1.amazonaws.com/dev/todos/' + todosId)
        .then(response => {
            store.dispatch(deleteTodosSuccess(todosId));
            return response;
        });
}
