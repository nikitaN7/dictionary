import React from 'react';

type Props = {
  errorMsg: string;
  action: string;
  onSubmit(action: string): void;
};

const ModalError: React.FC<Props> = ({ action, errorMsg, onSubmit }) => {
  return (
    <div className="modal__error">
      <img className="modal__error__icon" src="/img/warning.svg" alt="" />
      <p className="modal__error__text">
        {`The ${action} operation couldn't be completed: ${errorMsg}. `}
        <span role="button" tabIndex={0} onClick={() => onSubmit(action)}>
          Try again
        </span>
      </p>
    </div>
  );
};

export default ModalError;
