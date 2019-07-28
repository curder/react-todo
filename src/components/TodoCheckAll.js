import React from 'react';
import PropTypes from 'prop-types';

const TodoCheckAll = (props) => {
  return (
    <div>
      <label>
        <input defaultChecked={() => {
          props.anyRemaining()
        }}
               onClick={props.handleCheckAll}
               type="checkbox"/>
        Check All
      </label>
    </div>
  );
};

TodoCheckAll.propTypes = {
  anyRemaining: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
};

export default TodoCheckAll;
