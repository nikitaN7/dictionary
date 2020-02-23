import React, { useState, useEffect } from 'react';
import TestAnswersList from './TestAnswersList';
import styles from '../scss/test-answers.module.scss';

const wordsList = [
  'glance ',
  'in general',
  'nasty',
  'distinct',
  'inefficient',
  'pretty darn',
  'listen up',
  'taste',
  'flavour',
  'around the corner'
];

const shuffle = arr => {
  const copyArray = [...arr];
  return copyArray.sort(() => 0.5 - Math.random());
};

const getRandomItems = (list, n) => {
  const shuffled = shuffle(list);
  return shuffled.slice(0, n);
};

const TestAnswers = ({ correctAnswer = 'in general' }) => {
  const [answers, setAnswers] = useState([]);
  const [answerData, setAnswerData] = useState({
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

  const handleAnswerClick = answer => {
    if (!answerData.selected) {
      setAnswerData({
        selected: true,
        successAnswer: correctAnswer,
        errorAnswer: answer !== correctAnswer && answer
      });
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
