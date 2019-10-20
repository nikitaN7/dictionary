import React from 'react';

const ModalError = props => {
  const { action, errorMsg } = props;
  return (
    <div className="modal__error">
      <img className="modal__error__icon" src="/img/warning.svg" alt="" />
      <p className="modal__error__text">
        {`The ${props.action} operation couldn't be completed: ${errorMsg}. `}
        <span role="button" tabIndex="0" onClick={() => props.onSubmit(action)}>
          Try again
        </span>
      </p>
    </div>
  );
};

export default ModalError;
