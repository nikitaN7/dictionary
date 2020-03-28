import React from 'react';

type Props = {
  word: string;
};

const WordsTrainerWord: React.FC<Props> = ({ word }) => {
  return <div>{word}</div>;
};

export default WordsTrainerWord;
