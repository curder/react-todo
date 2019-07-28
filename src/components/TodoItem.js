import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

const TodoItem = props => {
  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <input type="checkbox" checked={props.todo.completed}
               onChange={(event) => {
                 props.handleCheckboxChange(props.todo, event, props.index)
               }}/>

        {!props.todo.editing &&
        <div className={classNames({
          'todo-item-label': true,
          'completed': props.todo.completed
        })}
             onDoubleClick={(event) => {
               props.handleEditTodo(props.todo, event, props.index)
             }}
        >{props.todo.title}</div>
        }
        {props.todo.editing &&
        <input className="todo-item-edit"
               autoFocus
               onBlur={(event) => {
                 props.handleDoneEdit(props.todo, event, props.index)
               }}
               onKeyUp={(event) => {
                 if (event.key === 'Enter') {
                   props.handleDoneEdit(props.todo, event, props.index)
                 } else if (event.key === 'Escape') {
                   props.handleCancelEdit(props.todo, event, props.index)
                 }
               }}
               defaultValue={props.todo.title}/>
        }
      </div>
      <div className="remove-item" onClick={() => {
        props.handleDelete(props.index);
      }}>&times;</div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDoneEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
