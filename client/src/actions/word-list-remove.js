import {
  DELETE_WORDS_PENDING,
  DELETE_WORDS_FAILURE,
  DELETE_WORDS_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';

const wordsApi = new WordsApi();

const deleteWordsPending = () => {
  return {
    type: DELETE_WORDS_PENDING
  };
};

const deleteWordsSuccess = () => {
  return {
    type: DELETE_WORDS_SUCCESS
  };
};

const deleteWordsError = error => {
  return {
    type: DELETE_WORDS_FAILURE,
    payload: error
  };
};

export const allWordsDelete = () => async dispatch => {
  dispatch(deleteWordsPending());

  try {
    await wordsApi.deleteAllWords();
    dispatch(deleteWordsSuccess());
  } catch (error) {
    dispatch(deleteWordsError(error.message));
  }
};
