import React from 'react';

const ModalForm = (props) => {

  const { newWord } = props;

  return (
    <form action="" className="modal__form">
      <div className="form__group form__group--field">
        <label className="form__group__label">En word</label>
        <input type="text" name="en" placeholder="Enter en word" onChange={props.handleChange} value={newWord.en}/>
      </div>

      <div className="form__group form__group--field">
        <label className="form__group__label">Ru word</label>
        <input type="text" name="ru" placeholder="Enter ru word" onChange={props.handleChange} value={newWord.ru}/>
      </div>

      <div className="form__group form__group--checkbox">
        <span className="form__group__label">Bookmark</span>
        <input id="bookmarks" name="bookmarks" type="checkbox" onChange={props.handleChange} checked={newWord.bookmarks}/>
        <label htmlFor="bookmarks">
          <div></div>
        </label>
      </div>
    </form>
  )
}

export default ModalForm;