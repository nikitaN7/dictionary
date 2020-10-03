import React from 'react';
import css from '../scss/jumble-letters.module.scss';

type Props = {
  letters: string[];
  onClick(letter: string): void;
};

const JumbleLettersList: React.FC<Props> = ({
  letters,
  onClick = () => {}
}) => {
  return (
    <div className={css.list}>
      <div className={css.letters} data-testid="jumbling-letters-list">
        {letters.map((letter, idx) => {
          return (
            <button
              key={idx + letter}
              data-testid="jumbling-letters-list-btn"
              className={css.lettersItem}
              onClick={() => onClick(letter)}
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
