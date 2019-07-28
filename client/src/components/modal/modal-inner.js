import React from 'react';

const ModalInner = (props) => {

  const { word, wordAction } = props;

  return (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <span className="modal__header__title">
            {`${wordAction} Word : `}
            <strong>{`${word.en} = ${word.ru}`}</strong>
          </span>
          <button className="modal__header__close" onClick={props.modalClose}>X</button>
        </div>

        <div className="modal__body">
          <form action="" className="modal__form">
            <div className="form__group form__group--field">
              <label className="form__group__label">En word</label>
              <input type="text" placeholder="Enter en word"/>
            </div>

            <div className="form__group form__group--field">
              <label className="form__group__label">Ru word</label>
              <input type="text" placeholder="Enter ru word"/>
            </div>

            <div className="form__group form__group--checkbox">
              <span className="form__group__label">Bookmark</span>
              <input id="bookmarks" type="checkbox" />

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