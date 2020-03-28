import React from 'react';

type Props = {
  title: string;
};

const WordsTrainerTitle: React.FC<Props> = ({ title = 'some word' }) => {
  return <div>title</div>;
};

export default WordsTrainerTitle;
