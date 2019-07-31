import React from 'react';
import ModalForm from './modal-form';

const ModalInner = (props) => {

  const { word, wordAction, newWord, handleChange, modalClose } = props;

  return (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <span className="modal__header__title">
            {`${wordAction} Word : `}
            <strong>{`${word.en} = ${word.ru}`}</strong>
          </span>
          <button className="modal__header__close" onClick={modalClose}>X</button>
        </div>

        <div className="modal__body">
          { wordAction === 'delete'
            ? 'Click on this button below to remove this word.'
            : <ModalForm handleChange={handleChange} newWord={newWord}/>
          }
        </div>

        <div className="modal__footer">
          <button
            className={`btn btn--md btn--${props.wordAction}`}
            onClick={(e) => props.onSubmit(props.wordAction)}>{props.wordAction}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalInner;