import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../scss/test-writing.module.scss';

type Props = {
  answer?: string;
  translate?: string;
};

const TestWriting: React.FC<Props> = ({
  answer = 'question',
  translate = 'вопрос'
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const renderAnswer = () => {
    return (
      <div className={styles.answer}>
        <span className={styles.answerTitle}>{answer}</span>
        <span className={styles.answerTranslate}>{translate}</span>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {isCompleted ? renderAnswer() : null}
      <div className={styles.field}>
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          className={classNames({
            [styles.success]: isCompleted && inputValue === answer,
            [styles.error]: isCompleted && inputValue !== answer
          })}
        />
      </div>

      {!isCompleted ? (
        <button onClick={() => setIsCompleted(true)}>Continue</button>
      ) : null}
    </div>
  );
};

export default TestWriting;
