import React, { useState } from 'react';
import WordsTrainerWord from '../WordsTrainerWord';
import TestAnswers from '../test-answers/TestAnswers';
import ListeningVoices from '../listening/ListeningVoices';
import WordsTrainerNext from '../WordsTrainerNext';

type IWordsListType = {
  from: string;
  to: string;
};

type WordsListType = {
  en: string;
  ru: string;
};

type Props = {
  direction?: string;
  speakers?: boolean;
  word?: WordsListType;
  wordsList?: WordsListType[];
  handleNextTest?(): void;
};

const WordsTrainerVariants: React.FC<Props> = ({
  direction = 'en-ru',
  speakers = true,
  word = {
    en: 'text',
    ru: 'text'
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

  const handleCompleteTest = (answer: any) => {
    setIsCompleted(true);
  };

  const wordFrom = from === 'ru' || from === 'en' ? word[from] : '';
  const wordTo = to === 'ru' || to === 'en' ? word[to] : '';

  return (
    <div>
      <WordsTrainerWord word={wordFrom} />
      {!speakers ? null : <ListeningVoices word={wordFrom} />}
      <TestAnswers
        correctAnswer={wordTo}
        wordsList={wordsList.map(word => wordTo)}
        handleCompleteTest={handleCompleteTest}
      />

      {isCompleted ? <WordsTrainerNext onClick={handleNextTest} /> : null}
    </div>
  );
};

export default WordsTrainerVariants;
