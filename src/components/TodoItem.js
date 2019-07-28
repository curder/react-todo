import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';
import {inject, observer} from "mobx-react";

const TodoItem = inject('TodoStore')(observer(props => {
  const {handleCheckboxChange, handleEditTodo, handleDoneEdit, handleCancelEdit, handleDelete} = props.TodoStore;

  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <input type="checkbox" checked={props.todo.completed}
               onChange={(event) => {
                 handleCheckboxChange(props.todo, event)
               }}/>

        {!props.todo.editing &&
        <div className={classNames({
          'todo-item-label': true,
          'completed': props.todo.completed
        })}
             onDoubleClick={(event) => {
               handleEditTodo(props.todo, event)
             }}
        >{props.todo.title}</div>
        }
        {props.todo.editing &&
        <input className="todo-item-edit"
               autoFocus
               onBlur={(event) => {
                 handleDoneEdit(props.todo, event)
               }}
               onKeyUp={(event) => {
                 if (event.key === 'Enter') {
                   handleDoneEdit(props.todo, event)
                 } else if (event.key === 'Escape') {
                   handleCancelEdit(props.todo, event)
                 }
               }}
               defaultValue={props.todo.title}/>
        }
      </div>
      <div className="remove-item" onClick={() => {
        handleDelete(props.todo.id);
      }}>&times;</div>
    </div>
  );
}));

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  // index: PropTypes.number.isRequired,
  // handleCheckboxChange: PropTypes.func.isRequired,
  // handleEditTodo: PropTypes.func.isRequired,
  // handleDoneEdit: PropTypes.func.isRequired,
  // handleCancelEdit: PropTypes.func.isRequired,
  // handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
