import React from 'react';
import css from './scss/words-trainer.module.scss';
import WordsTrainerHeader from './WordsTrainerHeader';
import WordsTrainerJumbling from './trainers/WordsTrainerJumbling';
import WordsTrainerVariants from './trainers/WordsTrainerVariants';
import WordsTrainerWriting from './trainers/WordsTrainerWriting';

const WordsTrainer: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <WordsTrainerHeader />
      <WordsTrainerVariants />
      <WordsTrainerJumbling />
      <WordsTrainerWriting />
    </div>
  );
};

export default WordsTrainer;
