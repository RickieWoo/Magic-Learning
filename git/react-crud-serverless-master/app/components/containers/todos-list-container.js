import React from 'react';
import { connect } from 'react-redux';
import TodosList from '../views/todos-list';
import * as todosApi from '../../api/todos-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const TodosListContainer = React.createClass({

  componentDidMount: function() {
    todosApi.getTodos();
    store.dispatch(loadSearchLayout('todos', 'Todos Results'));
  },

  render: function() {
    return (
      <TodosList todos={this.props.todos} deleteTodos={todosApi.deleteTodos} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    todos: store.todosState.todos
  };
};

export default connect(mapStateToProps)(TodosListContainer);
