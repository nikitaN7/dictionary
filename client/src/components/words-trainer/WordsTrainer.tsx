import React from 'react';
import css from './scss/words-trainer.module.scss';
import { useSelector } from 'react-redux';

import WordsTrainerRepetition from './repetition/WordsTrainerRepetition';

import { RootState } from '../../reducers/index';

const WordsTrainer: React.FC = () => {
  const wordsData = useSelector((state: RootState) => state.wordsRepetition);

  return (
    <div className={css.wrapper}>
      <WordsTrainerRepetition wordsData={wordsData} />
    </div>
  );
};

export default WordsTrainer;
