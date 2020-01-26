import React from 'react';
import css from '../scss/jumble-letters.module.scss';
import JumbleLettersBlock from './JumbleLettersBlock';
import JumbleLettersList from './JumbleLettersList';

const JumbleLetters = ({ word }) => {
  return (
    <div className={css.wrapper}>
      <JumbleLettersBlock />
      <JumbleLettersList />
    </div>
  );
};

export default JumbleLetters;
