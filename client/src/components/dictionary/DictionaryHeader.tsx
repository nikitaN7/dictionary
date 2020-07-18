import React from 'react';
import WordsHide from './words-hide';

type Props = {
  onActionClick(id: number | null, action: string): void;
  setHiddenWords: React.Dispatch<React.SetStateAction<string>>;
  hiddenWords: string;
};

const DictionaryHeader: React.FC<Props> = ({
  onActionClick,
  setHiddenWords,
  hiddenWords
}) => {
  return (
    <div className="dictionary__header">
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
