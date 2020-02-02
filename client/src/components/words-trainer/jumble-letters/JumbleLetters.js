import React, { useState, useEffect } from 'react';
import css from '../scss/jumble-letters.module.scss';
import JumbleLettersBlock from './JumbleLettersBlock';
import JumbleLettersList from './JumbleLettersList';

const shuffleLetters = word => {
  const allLetters = word.replace(/\s/g, '').split('');

  for (let i = allLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLetters[j], allLetters[i]] = [allLetters[i], allLetters[j]];
  }

  return allLetters;
};

const JumbleLetters = ({ word = 'go for a walk' }) => {
  const [enteredLetters, setEnteredLetters] = useState([]);
  const [remainingLetters, setRemainingLetters] = useState([]);
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

  const onLetterClick = (letter, idx) => {
    const nextLetter = getNextLetter();

    if (letter !== nextLetter) {
      showError();
      return;
    }

    setRemainingLetters(state => {
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
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
