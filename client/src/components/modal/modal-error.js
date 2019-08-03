import React from 'react';

const ModalError = (props) => {
  return (
    <div className="modal__error">
      <img className="modal__error__icon" src="/img/warning.svg" alt=""/>
      <p className="modal__error__text">
        {`The ${props.action} operation couldn't be completed: ${props.errorMsg}. `}
        <span onClick={(e) => props.onSubmit(props.action)}>Try again</span>
      </p>
    </div>
  )
}

export default ModalError;