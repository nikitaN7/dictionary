import React from 'react';
import TestAnswersItem from './TestAnswersItem';
import styles from '../scss/test-answers.module.scss';

type AnswerData = {
  selected?: boolean;
  successAnswerId?: null | number | string;
  errorAnswerId?: null | number | string;
};

type Answer = {
  key: string;
  correct: boolean;
  wordId: number | string;
};

type Props = {
  list: Answer[];
  answerData?: AnswerData;
  handleAnswerClick(answer: Answer): void;
};

const TestAnswersList: React.FC<Props> = ({
  list = [],
  answerData = {},
  handleAnswerClick = () => {}
}) => {
  return (
    <div className={styles.list}>
      {list.map((answer: Answer, idx: number) => {
        return (
          <TestAnswersItem
            key={answer.key}
            idx={idx}
            answer={answer}
            error={answer.wordId === answerData.errorAnswerId}
            success={answer.wordId === answerData.successAnswerId}
            onClick={() => handleAnswerClick(answer)}
          />
        );
      })}
    </div>
  );
};

export default TestAnswersList;
