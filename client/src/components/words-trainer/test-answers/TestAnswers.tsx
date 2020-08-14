import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import styles from '../scss/test-answers.module.scss';

import TestAnswersList from './TestAnswersList';

import { filterList } from '../../../utils/filterList';
import {
  shuffle,
  getRandomItems,
  checkKeyIsNumber
} from '../../../utils/helpers';

import {
  IWrapperChildren,
  AnswerData,
  Answer,
  AnswerId
} from '../../../types/wordsRepetition';

type Props = IWrapperChildren;

const DEFAULT_LANG = 'en';
const initialAnswerData = {
  selected: false,
  successAnswerId: null,
  errorAnswerId: null
};

const TestAnswers: React.FC<Props> = ({
  wordsList,
  wordId,
  lang = DEFAULT_LANG,
  handleCompleteTest = () => {}
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswerId, setCorrectAnswerId] = useState<AnswerId>(null);
  const [answerData, setAnswerData] = useState<AnswerData>(initialAnswerData);

  const resetAnswerData = () => {
    setAnswerData(initialAnswerData);
  };

  useEffect(() => {
    resetAnswerData();
  }, [wordId, wordsList, lang]);

  const handleUserKeyPress = useCallback(
    event => {
      event.preventDefault();

      const ALLOWED_KEY_NUMBERS = [1, 2, 3, 4];
      const { key } = event;
      const convertedKey = Number(key);

      if (!checkKeyIsNumber(key)) {
        return;
      }

      const isAnyKeyAllowed = ALLOWED_KEY_NUMBERS.some(
        keyItem => keyItem === convertedKey
      );

      if (isAnyKeyAllowed) {
        handleAnswerClick(answers[convertedKey - 1]);
      }
    },
    [answers, answerData]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    const RANDOM_WORDS_AMOUNT = 3;

    if (!wordId || !wordsList) {
      return;
    }

    const correctAnswer = wordsList[wordId];
    const filterById = (item: any) => item.id !== correctAnswer.id;
    const incorrectAnswers = filterList(wordsList, filterById);

    const randomIncorrectAnswers = getRandomItems(
      incorrectAnswers,
      RANDOM_WORDS_AMOUNT
    );

    setCorrectAnswerId(correctAnswer.id);

    setAnswers(() => {
      const answers = shuffle([...randomIncorrectAnswers, correctAnswer]);

      const mappableAnswers = answers.map(answer => {
        return {
          key: answer[lang],
          correct: answer.id === correctAnswer.id,
          wordId: answer.id
        };
      });

      return mappableAnswers;
    });
  }, [wordId, wordsList, lang]);

  const handleAnswerClick = (answer: Answer) => {
    const testInfo = {
      hasErrors: answer.wordId !== correctAnswerId,
      errorNumbers: 0
    };

    if (!answerData.selected) {
      setAnswerData({
        selected: true,
        successAnswerId: correctAnswerId,
        errorAnswerId: answer.wordId !== correctAnswerId ? answer.wordId : null
      });

      if (answer.wordId !== correctAnswerId) {
        testInfo.errorNumbers = 1;
      }

      handleCompleteTest(testInfo);
    }
  };

  return (
    <div className={styles.wrapper}>
      <TestAnswersList
        list={answers}
        answerData={answerData}
        handleAnswerClick={handleAnswerClick}
      />
    </div>
  );
};

export default TestAnswers;
