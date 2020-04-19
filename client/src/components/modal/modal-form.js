import React from 'react';

const ModalForm = props => {
  const { newWord } = props;

  return (
    <form action="" className="modal__form">
      <div className="form__group form__group--field">
        <label className="form__group__label" htmlFor="en-word">
          En word
        </label>
        <input
          type="text"
          id="en-word"
          name="en"
          placeholder="Enter en word"
          onChange={props.handleChange}
          value={newWord.en}
        />
      </div>

      <div className="form__group form__group--field">
        <label htmlFor={'ruword'} className="form__group__label">
          Ru word
        </label>
        <input
          type="text"
          id="ruword"
          name="ru"
          placeholder="Enter ru word"
          onChange={props.handleChange}
          value={newWord.ru}
        />
      </div>

      <div className="form__group form__group--field">
        <label className="form__group__label" htmlFor="transcription">
          Transcription
        </label>
        <input
          type="text"
          id="transcription"
          name="transcription"
          placeholder="Enter en word"
          onChange={props.handleChange}
          value={newWord.transcription}
        />
      </div>

      <div className="form__group form__group--field">
        <label htmlFor="association" className="form__group__label">
          Association
        </label>
        <input
          type="text"
          id="association"
          name="association"
          placeholder="Enter association"
          onChange={props.handleChange}
          value={newWord.association}
        />
      </div>

      <div className="form__group form__group--field">
        <label className="form__group__label">Examples</label>
        <input
          type="text"
          id="enExample"
          name="enExample"
          placeholder="Enter en example"
          onChange={props.handleChange}
          value={newWord.enExample}
        />
      </div>

      <div className="form__group form__group--field">
        <input
          type="text"
          id="ruExample"
          name="ruExample"
          placeholder="Enter ru example"
          onChange={props.handleChange}
          value={newWord.ruExample}
        />
      </div>

      <div className="form__group form__group--checkbox">
        <span className="form__group__label">In bookmarks</span>
        <input
          id="bookmarks"
          name="bookmarks"
          type="checkbox"
          onChange={props.handleChange}
          checked={newWord.bookmarks}
        />
        <label htmlFor="bookmarks">
          <div></div>
        </label>
      </div>
    </form>
  );
};

export default ModalForm;
