import React from 'react';
import * as classNames from "classnames";
import PropTypes from 'prop-types';

const TodoFiltered = (props) => {
  return (
    <div>
      <button onClick={(event) => {
        props.handleUpdateFilter('all')
      }}
              className={classNames({'active': props.filter === 'all'})}
      >All
      </button>
      <button onClick={(event) => {
        props.handleUpdateFilter('active')
      }}
              className={classNames({'active': props.filter === 'active'})}>Active
      </button>
      <button onClick={(event) => {
        props.handleUpdateFilter('completed')
      }}
              className={classNames({'active': props.filter === 'completed'})}>Completed
      </button>
    </div>
  );
};

TodoFiltered.propTypes = {
  handleUpdateFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoFiltered;
