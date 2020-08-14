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
};

const TestAnswersItem: React.FC<Props> = ({
  answer,
  idx,
  error = false,
  success = false,
  onClick = () => {}
}) => {
  return (
    <div
      className={classNames(
        styles.item,
        { [styles.success]: success },
        { [styles.error]: error }
      )}
    >
      <button className={styles.itemBtn} onClick={onClick}>
        <span className={styles.itemCount}>{idx + 1}</span>
        <span className={styles.itemText}>{answer.key}</span>
      </button>
    </div>
  );
};

export default TestAnswersItem;
