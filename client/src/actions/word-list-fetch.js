import {
  FETCH_WORDS_PENDING,
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_SUCCESS
} from './actions';

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

export const fetchWords = () => dispatch => {
  dispatch(wordsPending());
  fetch('/api/getData')
    .then(data => data.json())
    .then(res => dispatch(wordsSuccess(res.data)))
    .catch(err => dispatch(wordsError(err)));
};
