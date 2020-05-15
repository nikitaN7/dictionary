import {
  FETCH_WORDS_PENDING,
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';

const wordsApi = new WordsApi();

const wordsPending = newWords => {
  return {
    type: FETCH_WORDS_PENDING,
    payload: newWords
  };
};

const wordsSuccess = newWords => {
  return {
    type: FETCH_WORDS_SUCCESS,
    payload: newWords
  };
};

const wordsError = error => {
  return {
    type: FETCH_WORDS_FAILURE,
    payload: error
  };
};

export const fetchWords = () => async dispatch => {
  dispatch(wordsPending());

  try {
    const res = await wordsApi.getWords();
    dispatch(wordsSuccess(res.data.data));
  } catch (err) {
    dispatch(wordsError(err.message));
  }
};
