import React from 'react';

type Props = {
  onClick(event: React.MouseEvent<HTMLElement>): void;
};

const WordsTrainerNext: React.FC<Props> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Next</button>
    </div>
  );
};

export default WordsTrainerNext;
