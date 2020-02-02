import React from 'react';
import css from '../scss/jumble-letters.module.scss';

const JumbleLettersList = ({ letters }) => {
  return (
    <div className={css.list}>
      <div className={css.letters}>
        {letters.map(letter => {
          return <div className={css.lettersItem}>{letter}</div>;
        })}
      </div>
    </div>
  );
};

export default JumbleLettersList;
