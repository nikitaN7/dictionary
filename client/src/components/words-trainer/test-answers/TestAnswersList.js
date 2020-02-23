import React from 'react';
import TestAnswersItem from './TestAnswersItem';
import styles from '../scss/test-answers.module.scss';

const TestAnswersList = ({ list, answerData, handleAnswerClick }) => {
  return (
    <div className={styles.list}>
      {list.map((answer, idx) => {
        return (
          <TestAnswersItem
            key={idx}
            id={idx + 1}
            answer={answer}
            error={answerData.errorAnswer === answer}
            success={answerData.successAnswer === answer}
            onClick={() => handleAnswerClick(answer)}
          />
        );
      })}
    </div>
  );
};

export default TestAnswersList;
