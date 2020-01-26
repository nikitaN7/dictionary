import React from 'react';
import css from './scss/words-trainer.module.scss';

const WordsTrainerHeader = () => {
  return (
    <div className={css.header}>
      <span className={css.title}>Words Training</span>
    </div>
  );
};

export default WordsTrainerHeader;
