import React from 'react';
import css from './scss/words-trainer.module.scss';
import WordsTrainerHeader from './WordsTrainerHeader';
import JumbleLetters from './jumble-letters/JumbleLetters';

const WordsTrainer = () => {
  return (
    <div className={css.wrapper}>
      <WordsTrainerHeader />
      <JumbleLetters />
    </div>
  );
};

export default WordsTrainer;
