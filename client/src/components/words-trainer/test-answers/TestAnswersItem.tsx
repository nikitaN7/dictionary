import React from 'react';
import styles from '../scss/test-answers.module.scss';
import classNames from 'classnames/bind';

import { Answer } from '../../../types/wordsRepetition';

type Props = {
  answer: Answer;
  error: boolean;
  success: boolean;
  onClick(): void;
  idx: number;
  isCompletedTest: boolean
};

const TestAnswersItem: React.FC<Props> = ({
  answer,
  idx,
  error = false,
  success = false,
  onClick = () => {},
  isCompletedTest
}) => {
  return (
    <div
      className={classNames(
        styles.item,
        { [styles.success]: success },
        { [styles.error]: error }
      )}
    >
      <button disabled={isCompletedTest} className={styles.itemBtn} onClick={onClick}>
        <span className={styles.itemCount}>{idx + 1}</span>
        <span className={styles.itemText} data-testid={`test-answer${success ? '-success' : error ? '-error' : ''}`}>{answer.key}</span>
      </button>
    </div>
  );
};

export default TestAnswersItem;
