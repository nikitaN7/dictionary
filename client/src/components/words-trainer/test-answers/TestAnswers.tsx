import React, { useState, useEffect } from 'react';
import TestAnswersList from './TestAnswersList';
import { filterList } from '../../../utils/filterList';
import { shuffle } from '../../../utils/helpers';
import styles from '../scss/test-answers.module.scss';

const getRandomItems = (list: any[], n: number) => {
  const shuffled = shuffle(list);
  return shuffled.slice(0, n);
};

type TestInfo = {
  hasErrors: boolean;
  errorNumbers: number;
};

type Props = {
  wordsList?: any;
  wordId?: number;
  lang?: string;
  handleCompleteTest?(testInfo: TestInfo): void;
};

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

const initialAnswerData = {
  selected: false,
  successAnswerId: null,
  errorAnswerId: null
};

const TestAnswers: React.FC<Props> = ({
  wordsList = [],
  wordId,
  lang = 'en',
  handleCompleteTest = (testInfo: any) => {}
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswerId, setCorrectAnswerId] = useState();
  const [answerData, setAnswerData] = useState<AnswerData>(initialAnswerData);

  const resetAnswerData = () => {
    setAnswerData(initialAnswerData);
  };

  useEffect(() => {
    resetAnswerData();
  }, [wordId, wordsList, lang]);

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
      errorNumbers: 1
    };

    if (!answerData.selected) {
      setAnswerData({
        selected: true,
        successAnswerId: correctAnswerId,
        errorAnswerId: answer.wordId !== correctAnswerId ? answer.wordId : null
      });

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
