import React from 'react';
import css from '../scss/jumble-letters.module.scss';

const JumbleLettersList = ({ letters, onClick }) => {
  return (
    <div className={css.list}>
      <div className={css.letters}>
        {letters.map((letter, idx) => {
          return (
            <button
              className={css.lettersItem}
              onClick={() => onClick(letter, idx)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JumbleLettersList;
