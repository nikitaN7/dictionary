import React, { useState, useEffect } from 'react';
import css from '../scss/jumble-letters.module.scss';
import JumbleLettersBlock from './JumbleLettersBlock';
import JumbleLettersList from './JumbleLettersList';

const shuffleLetters = (word: string) => {
  const allLetters = word.replace(/\s/g, '').split('');

  for (let i = allLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLetters[j], allLetters[i]] = [allLetters[i], allLetters[j]];
  }

  return allLetters;
};

type Props = {
  word: string;
  handleCompleteTest(): void;
};

const JumbleLetters: React.FC<Props> = ({
  word = 'go for a walk',
  handleCompleteTest
}) => {
  const [enteredLetters, setEnteredLetters] = useState<string[]>([]);
  const [remainingLetters, setRemainingLetters] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const updatedLetters = shuffleLetters(word);
    setRemainingLetters(updatedLetters);
  }, [word]);

  const getNextLetter = () => {
    const wordWithoutSpaces = word.replace(/\s/g, '').split('');
    const nextLetter = wordWithoutSpaces[enteredLetters.length];

    return nextLetter || '';
  };

  const showError = () => {
    setHasError(false);
    setHasError(true);

    setTimeout(() => {
      setHasError(false);
    }, 1000);
  };

  const onLetterClick = (letter: string, idx: number) => {
    const nextLetter = getNextLetter();

    if (letter !== nextLetter) {
      showError();
      return;
    }

    setRemainingLetters(state => {
      const remainingLetters = [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];

      if (remainingLetters.length === 0) {
        handleCompleteTest();
      }

      return remainingLetters;
    });

    setEnteredLetters(state => [...state, letter]);
  };

  return (
    <div className={css.wrapper}>
      <JumbleLettersBlock
        letters={enteredLetters}
        word={word}
        hasError={hasError}
      />
      <JumbleLettersList letters={remainingLetters} onClick={onLetterClick} />
    </div>
  );
};

export default JumbleLetters;
