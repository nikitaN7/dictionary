import React from 'react';
import css from './scss/words-trainer.module.scss';
import WordsTrainerHeader from './WordsTrainerHeader';
import JumbleLetters from './jumble-letters/JumbleLetters';
import ListeningVoices from './listening/ListeningVoices';
import TestAnswers from './test-answers/TestAnswers';

const WordsTrainer = () => {
  return (
    <div className={css.wrapper}>
      <WordsTrainerHeader />
      <JumbleLetters />
      <ListeningVoices />
      <TestAnswers />
    </div>
  );
};

export default WordsTrainer;
