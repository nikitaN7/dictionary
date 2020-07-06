import { SET_REPETITION_DATA } from './actions';
import { shuffle } from '../utils/helpers';
import { Dispatch } from 'redux';

import {
  RepetitionActionTypes,
  WordsRepetitionState,
  Queue,
  Word
} from '../types/wordsRepetition';

const setRepetitionDataAction = (
  data: WordsRepetitionState
): RepetitionActionTypes => {
  return {
    type: SET_REPETITION_DATA,
    payload: {
      data
    }
  };
};

export const setRepetitionData = (selectedWords: number[]) => (
  dispatch: Dispatch,
  getState: any
) => {
  const wordsData: {
    [key: string]: Word;
  } = {};

  const queueData: Queue[] = [];
  const { words } = getState().wordList;

  const filteredWords = words.filter(({ id }: { id: Word['id'] }) => {
    return selectedWords.includes(Number(id));
  });

  filteredWords.forEach((word: Word) => {
    const wordData = { ...word };
    const queue = {
      id: word.id,
      type: 1
    };

    wordData.repetition = 3;
    wordsData[word.id] = wordData;

    queueData.push(queue);
  });

  const data = {
    queue: shuffle(queueData),
    words: wordsData
  };

  dispatch(setRepetitionDataAction(data));
};
