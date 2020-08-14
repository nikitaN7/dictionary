import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import classNames from 'classnames/bind';
import repetitionStyles from '../scss/repetition.module.scss';
import styles from '../scss/test-writing.module.scss';

import { IWrapperChildren } from '../../../types/wordsRepetition';

type CurrentWord = {
  answer: string | null;
  translate: string | null;
};

type Props = IWrapperChildren;

const TestWriting: React.FC<Props> = ({
  wordsList,
  wordId,
  lang,
  handleCompleteTest = () => {}
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentWord, setCurrentWord] = useState<CurrentWord>({
    answer: null,
    translate: null
  });

  const trimmedInputValue = inputValue.trim().toLowerCase();
  const trimmedAnswerValue = currentWord.answer
    ? currentWord.answer.trim().toLowerCase()
    : currentWord.answer;

  const resetState = () => {
    setIsCompleted(false);
    setInputValue('');
    setCurrentWord({
      answer: null,
      translate: null
    });
  };

  useEffect(() => {
    if (!wordId || !wordsList) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }

    resetState();

    const currentWord = wordsList[wordId];

    setCurrentWord({
      answer: currentWord[lang],
      translate: currentWord['ru']
    });
  }, [wordId, wordsList, lang]);

  const handleCompleteClick = () => {
    if (inputValue.trim().length === 0) {
      return;
    }

    setIsCompleted(true);

    const testInfo = {
      hasErrors: trimmedInputValue !== trimmedAnswerValue,
      errorNumbers: trimmedInputValue !== trimmedAnswerValue ? 1 : 0
    };

    handleCompleteTest(testInfo);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const ENTER_KEY_CODE = 13;
    const { keyCode } = event;

    if (keyCode === ENTER_KEY_CODE) {
      inputRef.current!.blur();
      handleCompleteClick();
    }
  };

  const renderAnswer = () => {
    return (
      <div className={styles.answer}>
        <span className={styles.answerTitle}>{currentWord.answer}</span>
        <span className={styles.answerTranslate}>{currentWord.translate}</span>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {isCompleted ? renderAnswer() : null}
      <div className={styles.field}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onKeyDown={handleInputKeyPress}
          onChange={({ target }) => setInputValue(target.value)}
          className={classNames({
            [styles.success]:
              isCompleted && trimmedInputValue === trimmedAnswerValue,
            [styles.error]:
              isCompleted && trimmedInputValue !== trimmedAnswerValue
          })}
        />
      </div>

      {!isCompleted ? (
        <button
          className={classNames(
            repetitionStyles.taskCompleteBtn,
            repetitionStyles.taskCompleteBtnCenter
          )}
          onClick={handleCompleteClick}
        >
          Complete
        </button>
      ) : null}
    </div>
  );
};

export default TestWriting;
