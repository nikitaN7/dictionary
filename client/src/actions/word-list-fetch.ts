import {
  FETCH_WORDS_PENDING,
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';
import { ThunkType } from '../reducers/index';

import { Word, RepetitionActionTypes } from '../types/wordsList';

const wordsApi = new WordsApi();

const fetchWordsPending = (): RepetitionActionTypes => {
  return {
    type: FETCH_WORDS_PENDING
  };
};

const fetchWordsSuccess = (newWords: Word[]): RepetitionActionTypes => {
  return {
    type: FETCH_WORDS_SUCCESS,
    payload: newWords
  };
};

const fetchWordsError = (error: any): RepetitionActionTypes => {
  return {
    type: FETCH_WORDS_FAILURE,
    payload: error
  };
};

export const fetchWords = (): ThunkType => async dispatch => {
  dispatch(fetchWordsPending());

  try {
    const res = await wordsApi.getWords();
    dispatch(fetchWordsSuccess(res.data.data));
  } catch (err) {
    dispatch(fetchWordsError(err.message));
  }
};
