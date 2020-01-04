import React, { useEffect } from 'react';
import ModalForm from './modal-form';
import ModalError from './modal-error';
import ModalBtn from './modal-btn';
import Preloader from '../preloader';

const ModalInner = ({
  wordAction,
  newWord,
  handleChange,
  modalClose,
  onSubmit,
  error,
  pending
}) => {
  useEffect(() => {
    const onKeyPress = e => {
      const ESC_KEY = 27;
      const ENTER_KEY = 13;

      if (e.keyCode === ESC_KEY) {
        modalClose();
      }

      if (e.keyCode === ENTER_KEY) {
        onSubmit(wordAction);
      }
    };

    document.addEventListener('keydown', onKeyPress, false);
    return () => document.removeEventListener('keydown', onKeyPress, false);
  }, [onSubmit, modalClose, wordAction]);

  const hasData = !(pending || error);

  return (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <span className="modal__header__title">
            {`${wordAction} Word : `}
            <strong>{`${newWord.en} = ${newWord.ru}`}</strong>
          </span>
          <button
            type="button"
            className="modal__header__close"
            onClick={modalClose}
          >
            X
          </button>
        </div>

        <div className="modal__body">
          {wordAction === 'delete' ? (
            'Click on this button below to remove this word.'
          ) : (
            <ModalForm handleChange={handleChange} newWord={newWord} />
          )}
        </div>

        <div className="modal__footer">
          {error ? (
            <ModalError
              errorMsg={error}
              action={wordAction}
              onSubmit={onSubmit}
            />
          ) : null}
          {pending ? <Preloader size="sm" /> : null}
          {hasData ? (
            <ModalBtn onSubmit={onSubmit} action={wordAction} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModalInner;
