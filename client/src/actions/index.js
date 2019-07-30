import axios from 'axios';
import store from '../store';
import { getMaxId } from '../function/getMaxId';

const wordsLoaded = (newWords) => {
  return {
    type: 'FETCH_WORDS_SUCCESS',
    payload: newWords
  };
};

const wordsError = (error) => {
  return {
    type: 'FETCH_WORDS_FAILURE',
    payload: error
  };
};

const fetchWords = () => (dispatch) => {
  fetch('/api/getData')
    .then((data) => data.json())
    .then((res)  => dispatch(wordsLoaded(res.data)))
    .catch((err) => dispatch(wordsError(err)));
};

const wordAddAction = (wordId, wordData) => {
  return {
    type: 'BOOK_ADD_TO_LIST',
    wordId: wordId,
    wordData: wordData
  }
}

const wordAdd = (wordData) => (dispatch) => {

  const { words } = store.getState().wordList;
  const newId = getMaxId(words) + 1;

  axios.post('/api/putData', {
    ...wordData,
    id: newId
  })
  .then((res) => {
    if (res.statusText === 'OK') {
      dispatch(fetchWords())
      dispatch(wordAddAction(newId, wordData))
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

const wordUpdateAction = (wordId, wordData) => {
  return {
    type: 'BOOK_UPDATE_IN_LIST',
    wordId: wordId,
    wordData: wordData
  }
}

const wordUpdate = (word, wordData) => (dispatch) => {
  axios.post('/api/updateData', {
    id: word._id,
    update: { ...wordData },
  })
  .then((res) => {
    if (res.statusText === 'OK') {
      dispatch(wordUpdateAction(word.id, wordData))
    }
  })
  .catch((err) => {
    console.log(err);
  });

};

const wordDeleteAction = (wordId) => {
  return {
    type: 'BOOK_DELETE_FROM_LIST',
    wordId: wordId
  };
};

const wordDelete = (word) => (dispatch) => {
  axios.delete('/api/deleteData', {
    data: {
      id: word._id
    }
  })
  .then((res) => {
    if (res.statusText === 'OK') {
      dispatch(wordDeleteAction(word.id))
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export {
  fetchWords,
  wordAdd,
  wordUpdate,
  wordDelete
};