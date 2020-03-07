import React, { useState } from 'react';
import WordsTrainerWord from '../WordsTrainerWord';
import TestAnswers from '../test-answers/TestAnswers';
import ListeningVoices from '../listening/ListeningVoices';
import WordsTrainerNext from '../WordsTrainerNext';

const WordsTrainerVariants = ({
  direction = 'en-ru',
  speakers = true,
  word = {
    en: 'ought to',
    ru: 'обязан'
  },
  wordsList = [
    { en: 'glance ', ru: 'перевод' },
    { en: 'in general', ru: 'в общем' },
    { en: 'nasty', ru: 'перевод' },
    { en: 'distinct', ru: 'перевод' },
    { en: 'inefficient', ru: 'не эффективный' },
    { en: 'pretty darn', ru: 'чертовски' },
    { en: 'listen up', ru: 'слущай сюда' },
    { en: 'taste', ru: 'вкус' },
    { en: 'flavour', ru: 'вкус' },
    { en: 'around the corner', ru: 'за углом' }
  ],
  handleNextTest
}) => {
  const [from, to] = direction.split('-');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteTest = answer => {
    setIsCompleted(true);
  };

  return (
    <div>
      <WordsTrainerWord word={word[from]} />
      {!speakers ? null : <ListeningVoices word={word[from]} />}
      <TestAnswers
        correctAnswer={word[to]}
        wordsList={wordsList.map(word => word[to])}
        handleCompleteTest={handleCompleteTest}
      />

      {isCompleted ? <WordsTrainerNext onClick={handleNextTest} /> : null}
    </div>
  );
};

export default WordsTrainerVariants;
