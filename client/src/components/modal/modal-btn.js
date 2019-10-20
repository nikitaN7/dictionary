import React from 'react';

const ModalBtn = props => {
  const { action, onSubmit } = props;
  return (
    <button
      type="button"
      className={`btn btn--md btn--${action}`}
      onClick={() => onSubmit(action)}
    >
      {action}
    </button>
  );
};

export default ModalBtn;
