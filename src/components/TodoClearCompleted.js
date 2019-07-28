import React from 'react';
import {inject, observer} from "mobx-react";

const TodoClearCompleted = inject('TodoStore')(observer(props => {
  const {handleClearCompleted} = props.TodoStore;
  return (
    <div>
      <button onClick={handleClearCompleted}>Clear Completed
      </button>
    </div>
  );
}));

TodoClearCompleted.propTypes = {
  // handleClearCompleted: PropTypes.func.isRequired,
};

export default TodoClearCompleted;
