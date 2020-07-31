import React from 'react';

type Props = {
  action: string;
  onSubmit(action: string): void;
};

const ModalBtn: React.FC<Props> = ({ action, onSubmit }) => {
  return (
    <button
      type="button"
      className="modal__btn"
      onClick={() => onSubmit(action)}
    >
      {action}
    </button>
  );
};

export default ModalBtn;
