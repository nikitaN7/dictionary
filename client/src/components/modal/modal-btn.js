import React from 'react';

const ModalBtn = (props) => {
  const { action, onSubmit } = props;
  return (
    <button
      className={`btn btn--md btn--${action}`}
      onClick={(e) => onSubmit(action)}>
      {action}
    </button>
  )
}

export default ModalBtn;