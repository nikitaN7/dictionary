import axios from 'axios';
import { getMaxId } from '../utils/getMaxId';
import {
  UPDATE_LIST_PENDING,
  UPDATE_LIST_FAILURE,
  WORDS_ADD_SUCCESS,
  WORDS_UPDATE_SUCCESS,
  WORDS_DELETE_SUCCESS
} from './actions';

const updateListPending = () => {
  return {
    type: UPDATE_LIST_PENDING
  };
};

const updateListError = error => {
  return {
    type: UPDATE_LIST_FAILURE,
    payload: error
  };
};

const wordAddSuccess = (wordId, wordData) => {
  return {
    type: WORDS_ADD_SUCCESS,
    wordId,
    wordData
  };
};

const wordUpdateSuccess = (wordId, wordData) => {
  return {
    type: WORDS_UPDATE_SUCCESS,
    wordId,
    wordData
  };
};

const wordDeleteSuccess = wordId => {
  return {
    type: WORDS_DELETE_SUCCESS,
    wordId
  };
};

const wordAdd = (wordData, modalClose, modalReset, scrollToBottom) => (
  dispatch,
  getState
) => {
  const { words } = getState().wordList;
  const newId = getMaxId(words) + 1;

  dispatch(updateListPending());

  axios
    .post('/api/putData', {
      ...wordData,
      id: newId
    })
    .then(res => {
      const newWord = res.data.data;

      dispatch(wordAddSuccess(newId, newWord));
      modalClose();
      modalReset();
      scrollToBottom((words.length / 10).toFixed());
    })
    .catch(err => {
      dispatch(updateListError(err.message));
    });
};

const wordUpdate = (word, wordData, modalClose) => dispatch => {
  dispatch(updateListPending());

  axios
    .post('/api/updateData', {
      id: word._id,
      update: { ...wordData }
    })
    .then(() => {
      dispatch(wordUpdateSuccess(word.id, wordData));
      modalClose();
    })
    .catch(err => {
      dispatch(updateListError(err.message));
    });
};

const wordDelete = (word, modalClose) => dispatch => {
  dispatch(updateListPending());

  axios
    .delete('/api/deleteData', {
      data: {
        id: word._id
      }
    })
    .then(() => {
      dispatch(wordDeleteSuccess(word.id));
      modalClose();
    })
    .catch(err => {
      dispatch(updateListError(err.message));
    });
};

export { wordAdd, wordUpdate, wordDelete };
