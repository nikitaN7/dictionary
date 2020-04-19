import React from 'react';
import WordsHide from './words-hide';

const DictionaryHeader = ({ onActionClick, setHiddenWords, hiddenWords }) => {
  return (
    <div className="dictionary__header">
      <span className="dictionary__title">Words dictionary</span>

      <WordsHide setHiddenWords={setHiddenWords} hiddenWords={hiddenWords} />
      <button
        type="button"
        className="btn btn--lg btn--add"
        onClick={() => onActionClick(null, 'add')}
      >
        Add New
      </button>
    </div>
  );
};

export default DictionaryHeader;
