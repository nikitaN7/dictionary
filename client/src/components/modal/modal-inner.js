import React from 'react';
import ModalForm from './modal-form';
import ModalError from './modal-error';
import ModalBtn from './modal-btn';

const ModalInner = (props) => {

  const { wordAction, newWord, handleChange, modalClose, onSubmit, error, pending} = props;
  const hasData = !(pending || error);

  return (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <span className="modal__header__title">
            {`${wordAction} Word : `}
            <strong>{`${newWord.en} = ${newWord.ru}`}</strong>
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
          {error ? <ModalError errorMsg={error} action={wordAction} onSubmit={onSubmit} /> : null}
          {pending ? <img src="/img/sm-loader.svg" alt=""/> : null}
          {hasData ? <ModalBtn  onSubmit={onSubmit} action={wordAction}  /> : null}
        </div>
      </div>
    </div>
  )
}

export default ModalInner;