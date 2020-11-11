import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { SET_REPETITION_DATA } from './actions';
import { shuffle } from '../utils/helpers';
import { RootState, ThunkType } from '../reducers/index';

import {
  RepetitionActionTypes,
  WordsRepetitionState,
  IQueue,
  Word
} from '../types/wordsRepetition';

import { v4 as uuidv4 } from 'uuid';

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

export const setRepetitionData = (selectedWords: number[]): ThunkType => (
  dispatch,
  getState
) => {
  const wordsData: {
    [key: string]: Word;
  } = {};

  const queueData: IQueue[] = [];
  const { words } = getState().wordList;

  const filteredWords = words.filter(({ id }: { id: Word['id'] }) => {
    return selectedWords.includes(Number(id));
  });

  filteredWords.forEach((word: Word) => {
    const wordData = { ...word };
    const queue = {
      id: word.id,
      type: 1,
      uniqId: uuidv4()
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
