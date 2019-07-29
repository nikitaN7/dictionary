import React from 'react';

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
          <form action="" className="modal__form">
            <div className="form__group form__group--field">
              <label className="form__group__label">En word</label>
              <input type="text" name="en" placeholder="Enter en word" onChange={handleChange} value={newWord.en}/>
            </div>

            <div className="form__group form__group--field">
              <label className="form__group__label">Ru word</label>
              <input type="text" name="ru" placeholder="Enter ru word" onChange={handleChange} value={newWord.ru}/>
            </div>

            <div className="form__group form__group--checkbox">
              <span className="form__group__label">Bookmark</span>
              <input id="bookmarks" name="bookmarks" type="checkbox" onChange={handleChange} checked={newWord.bookmarks}/>
              <label htmlFor="bookmarks">
                <div></div>
              </label>
            </div>

          </form>
        </div>

        <div className="modal__footer">
          <button
            className={`btn btn--md btn--${props.wordAction}`}
            onClick={props.onSubmit}>{props.wordAction}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalInner;