import React from 'react';
import css from './scss/words-trainer.module.scss';
import WordsTrainerRepetition from './repetition/WordsTrainerRepetition';
import { useSelector } from 'react-redux';

const WordsTrainer: React.FC = () => {
  const wordsData = useSelector((state: any) => state.wordsRepetition);

  return (
    <div className={css.wrapper}>
      <WordsTrainerRepetition wordsData={wordsData} />
    </div>
  );
};

export default WordsTrainer;
