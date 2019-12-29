import axios from 'axios';
import {
  DELETE_WORDS_PENDING,
  DELETE_WORDS_FAILURE,
  DELETE_WORDS_SUCCESS
} from './actions';

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

export const allWordsDelete = () => dispatch => {
  dispatch(deleteWordsPending());

  axios
    .delete('/api/deleteAllData')
    .then(() => {
      dispatch(deleteWordsSuccess());
    })
    .catch(err => {
      dispatch(deleteWordsError(err));
    });
};
