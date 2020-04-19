import React from 'react';
import css from './scss/words-trainer.module.scss';
import WordsTrainerHeader from './WordsTrainerHeader';
import WordsTrainerRepetition from './repetition/WordsTrainerRepetition';
import { wordsData } from '../../data/fakeWordsRepetitionData';

const WordsTrainer: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <WordsTrainerHeader />
      <WordsTrainerRepetition wordsData={wordsData} />
    </div>
  );
};

export default WordsTrainer;
