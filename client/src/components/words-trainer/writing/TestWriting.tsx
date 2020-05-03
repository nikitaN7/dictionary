import React, { useState, useEffect, KeyboardEvent } from 'react';
import classNames from 'classnames/bind';
import repetitionStyles from '../scss/repetition.module.scss';
import styles from '../scss/test-writing.module.scss';
import { useRef } from 'react';

type TestInfo = {
  hasErrors: boolean;
  errorNumbers: number;
};

type CurrentWord = {
  answer: string | null;
  translate: string | null;
};

type Props = {
  wordsList?: any;
  wordId?: number;
  lang?: string;
  handleCompleteTest?(testInfo: TestInfo): void;
};

const TestWriting: React.FC<Props> = ({
  wordsList = [],
  wordId,
  lang = 'en',
  handleCompleteTest = (testInfo: any) => {}
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentWord, setCurrentWord] = useState<CurrentWord>({
    answer: null,
    translate: null
  });

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
      hasErrors: inputValue !== currentWord.answer,
      errorNumbers: inputValue !== currentWord.answer ? 1 : 0
    };

    handleCompleteTest(testInfo);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const ENTER_KEY_CODE = 13;
    const { keyCode } = event;

    if (keyCode === ENTER_KEY_CODE) {
      const { target } = event;

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
            [styles.success]: isCompleted && inputValue === currentWord.answer,
            [styles.error]: isCompleted && inputValue !== currentWord.answer
          })}
        />
      </div>

      {!isCompleted ? (
        <button
          className={repetitionStyles.continueBtn}
          onClick={handleCompleteClick}
        >
          Complete
        </button>
      ) : null}
    </div>
  );
};

export default TestWriting;
