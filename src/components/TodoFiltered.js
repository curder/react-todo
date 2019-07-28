import React from 'react';
import * as classNames from "classnames";
import {inject, observer} from "mobx-react";

const TodoFiltered = inject('TodoStore')(observer(props => {
  const {handleUpdateFilter, filter} = props.TodoStore;
  return (
    <div>
      <button onClick={(event) => {
        handleUpdateFilter('all')
      }}
              className={classNames({'active': filter === 'all'})}
      >All
      </button>
      <button onClick={(event) => {
        handleUpdateFilter('active')
      }}
              className={classNames({'active': filter === 'active'})}>Active
      </button>
      <button onClick={(event) => {
        handleUpdateFilter('completed')
      }}
              className={classNames({'active': filter === 'completed'})}>Completed
      </button>
    </div>
  );
}));

TodoFiltered.propTypes = {
  // handleUpdateFilter: PropTypes.func.isRequired,
  // filter: PropTypes.string.isRequired,
};

export default TodoFiltered;
