import React from 'react';
import PropTypes from 'prop-types';

const TodoClearCompleted = (props) => {
  return (
    <div>
      <button onClick={props.handleClearCompleted}>Clear Completed
      </button>
    </div>
  );
};

TodoClearCompleted.propTypes = {
  handleClearCompleted: PropTypes.func.isRequired,
};

export default TodoClearCompleted;
