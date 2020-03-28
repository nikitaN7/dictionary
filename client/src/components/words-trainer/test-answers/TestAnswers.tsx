import React, { useState, useEffect } from 'react';
import TestAnswersList from './TestAnswersList';
import styles from '../scss/test-answers.module.scss';

const shuffle = (arr: any[]) => {
  const copyArray = [...arr];
  return copyArray.sort(() => 0.5 - Math.random());
};

const getRandomItems = (list: any[], n: number) => {
  const shuffled = shuffle(list);
  return shuffled.slice(0, n);
};

type Props = {
  correctAnswer: string;
  wordsList: string[];
  handleCompleteTest(answer: string): void;
};

type AnswerData = {
  selected: boolean;
  successAnswer: null | string | false;
  errorAnswer: null | string | false;
};

const TestAnswers: React.FC<Props> = ({
  correctAnswer = 'in general',
  wordsList = [],
  handleCompleteTest
}) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerData, setAnswerData] = useState<AnswerData>({
    selected: false,
    successAnswer: null,
    errorAnswer: null
  });

  useEffect(() => {
    const RANDOM_WORDS_AMOUNT = 3;
    const incorrectAnswers = wordsList.filter(item => item !== correctAnswer);
    const randomIncorrectAnswers = getRandomItems(
      incorrectAnswers,
      RANDOM_WORDS_AMOUNT
    );
    const newAnswers = shuffle([...randomIncorrectAnswers, correctAnswer]);

    setAnswers(newAnswers);
  }, []);

  const handleAnswerClick = (answer: string) => {
    if (!answerData.selected) {
      setAnswerData({
        selected: true,
        successAnswer: correctAnswer,
        errorAnswer: answer !== correctAnswer && answer
      });

      handleCompleteTest(answer);
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
