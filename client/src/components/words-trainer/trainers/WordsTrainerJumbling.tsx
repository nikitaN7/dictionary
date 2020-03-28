import React, { useState } from 'react';
import WordsTrainerWord from '../WordsTrainerWord';
import TestAnswers from '../test-answers/TestAnswers';
import WordsTrainerNext from '../WordsTrainerNext';
import JumbleLetters from '../jumble-letters/JumbleLetters';

type WordsListType = {
  en: string;
  ru: string;
};

type Props = {
  direction?: string;
  word?: WordsListType;
  wordsList?: WordsListType[];
  handleNextTest?(): void;
};

const WordsTrainerJumbling: React.FC<Props> = ({
  direction = 'ru-en',
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
  handleNextTest = () => {}
}) => {
  const [from, to] = direction.split('-');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteTest = () => {
    setIsCompleted(true);
  };

  const wordFrom = from === 'ru' || from === 'en' ? word[from] : '';
  const wordTo = to === 'ru' || to === 'en' ? word[to] : '';

  return (
    <div>
      <WordsTrainerWord word={wordFrom} />
      <JumbleLetters word={wordTo} handleCompleteTest={handleCompleteTest} />

      {isCompleted ? <WordsTrainerNext onClick={handleNextTest} /> : null}
    </div>
  );
};

export default WordsTrainerJumbling;
