import React from 'react';
import css from './scss/repetition.module.scss';

import { IWordExamples } from '../../types/wordsRepetition';

type Props = {
  onNextTestClick: () => void;
  examples: IWordExamples;
};

const WordsTrainerTaskComplete: React.FC<Props> = ({
  onNextTestClick,
  examples
}) => {
  return (
    <div className={css.taskCompleteWrapper}>
      <div className={css.examples}>
        <span className={css.examplesTitle}>Examples:</span>
        <p className={css.examplesText}>{examples.en}</p>
        <p className={css.examplesText}>{examples.ru}</p>
      </div>
      <button
        className={css.taskCompleteBtn}
        data-testid="next-test-button"
        onClick={onNextTestClick}
      >
        Continue
      </button>
    </div>
  );
};

export default WordsTrainerTaskComplete;
