import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers/index';

import WordsTrainerNoWords from './WordsTrainerNoWords';

const WordsTrainerSelectWords = () => {
  const allWords = useSelector((state: RootState) => state.wordList.words);

  if (!allWords.length) {
    return <WordsTrainerNoWords />;
  }

  console.log(allWords);

  return <div></div>;
};

export default WordsTrainerSelectWords;
