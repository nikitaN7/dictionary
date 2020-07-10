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

const deleteWordsSuccess = (): RepetitionActionTypes => {
  return {
    type: DELETE_WORDS_SUCCESS
  };
};

const deleteWordsError = (error: any): RepetitionActionTypes => {
  return {
    type: DELETE_WORDS_FAILURE,
    payload: error
  };
};

export const allWordsDelete = (): ThunkType => async dispatch => {
  dispatch(deleteWordsPending());

  try {
    await wordsApi.deleteAllWords();
    dispatch(deleteWordsSuccess());
  } catch (error) {
    dispatch(deleteWordsError(error.message));
  }
};
