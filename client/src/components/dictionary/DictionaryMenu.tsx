import React from 'react';
import css from './scss/dictionaryMenu.module.scss';

import Button from '../ui/Button';

const buttonStyles = {
  padding: '0.5em 1em',
  fontWeight: '500',
  color: 'slategray',
  borderRadius: '4px'
};

type Props = {
  selectedWords: number[];
  allWordsQuantity?: number;
  clearSelectedWords(): void;
  exerciseSelectedWords(): void;
};

const DictionaryMenu: React.FC<Props> = ({
  selectedWords = [],
  allWordsQuantity = 0,
  clearSelectedWords = () => {},
  exerciseSelectedWords = () => {}
}) => {
  const selectedWordQuantity = selectedWords.length;

  return (
    <div className={css.wrapper}>
      <div className={css.row}>
        <Button styles={buttonStyles} onClick={clearSelectedWords}>
          Clear selection
        </Button>
        <div
          className={css.text}
        >{`${selectedWordQuantity} of ${allWordsQuantity} selected`}</div>
      </div>

      <Button styles={buttonStyles} onClick={exerciseSelectedWords}>
        Exercise selected words
      </Button>
    </div>
  );
};

export default DictionaryMenu;
