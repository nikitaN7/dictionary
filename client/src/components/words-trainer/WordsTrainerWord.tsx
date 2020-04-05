import React from 'react';
import css from './scss/words-trainer.module.scss';

type Props = {
  word: string;
};

const WordsTrainerWord: React.FC<Props> = ({ word }) => {
  return (
    <div className={css.wordTitle}>
      <div className={css.wordTitleText}>{word}</div>
    </div>
  );
};

export default WordsTrainerWord;
