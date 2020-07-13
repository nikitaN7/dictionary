import React from 'react';

type Props = {
  action: string;
  onSubmit(action: string): void;
};

const ModalBtn: React.FC<Props> = ({ action, onSubmit }) => {
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
