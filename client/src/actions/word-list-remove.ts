import {
  DELETE_WORDS_PENDING,
  DELETE_WORDS_FAILURE,
  DELETE_WORDS_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';
import { ThunkType } from '../reducers/index';

import { Word, RepetitionActionTypes } from '../types/wordsList';

const wordsApi = new WordsApi();

const deleteWordsPending = (): RepetitionActionTypes => {
  return {
    type: DELETE_WORDS_PENDING
  };
};

const deleteWordsSuccess = (ids: number[]): RepetitionActionTypes => {
  return {
    type: DELETE_WORDS_SUCCESS,
    payload: {
      ids
    }
  };
};

const deleteWordsError = (error: any): RepetitionActionTypes => {
  return {
    type: DELETE_WORDS_FAILURE,
    payload: error
  };
};

export const deleteWords = (ids: number[]): ThunkType => async dispatch => {
  dispatch(deleteWordsPending());

  if (!ids) {
    return;
  }

  try {
    await wordsApi.deleteWords(ids);
    dispatch(deleteWordsSuccess(ids));
  } catch (error) {
    dispatch(deleteWordsError(error.message));
  }
};
