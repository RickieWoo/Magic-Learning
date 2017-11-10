import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="data-list">

      {props.todos.map(todos => {

        return (
          <div key={todos.id} className="data-list-item">
            <div className="details">{todos.body}</div>
            <div className="controls">
              <button onClick={props.deleteTodos.bind(null, todos.id)} className="delete">Delete</button>
            </div>
          </div>
        );

      })}

    </div>
  );
}
