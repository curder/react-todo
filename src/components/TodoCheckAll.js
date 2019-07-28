import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";

const TodoCheckAll = inject('TodoStore')(observer(props => {
  const {anyRemaining, handleCheckAll} = props.TodoStore;
  return (
    <div>
      <label>
        <input defaultChecked={anyRemaining}
               onClick={handleCheckAll}
               type="checkbox"/>
        Check All
      </label>
    </div>
  );
}));

TodoCheckAll.propTypes = {
  // TodoStore: PropTypes.object.isRequired,
  // anyRemaining: PropTypes.func.isRequired,
  // handleCheckAll: PropTypes.func.isRequired,
};

export default TodoCheckAll;
