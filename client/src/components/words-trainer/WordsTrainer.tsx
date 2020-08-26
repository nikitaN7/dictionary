import React from 'react';
import css from './scss/words-trainer.module.scss';
import { useSelector } from 'react-redux';

import WordsTrainerRepetition from './repetition/WordsTrainerRepetition';
import WordsTrainerSelectWords from './WordsTrainerSelectWords';

import { RootState } from '../../reducers/index';

const WordsTrainer: React.FC = () => {
  const wordsData = useSelector((state: RootState) => state.wordsRepetition);

  if (wordsData.queue.length && Object.keys(wordsData.words).length) {
    return (
      <div className={css.wrapper}>
        <WordsTrainerRepetition wordsData={wordsData} />
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <WordsTrainerSelectWords />
    </div>
  );
};

export default WordsTrainer;
