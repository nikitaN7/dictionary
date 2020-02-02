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

  useEffect(() => {
    const updatedLetters = shuffleLetters(word);
    setRemainingLetters(updatedLetters);
  }, [word]);

  return (
    <div className={css.wrapper}>
      <JumbleLettersBlock />
      <JumbleLettersList letters={remainingLetters} />
    </div>
  );
};

export default JumbleLetters;
