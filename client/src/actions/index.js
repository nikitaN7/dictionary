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

const wordAdd = (wordId, wordData) => {
  return {
    type: 'BOOK_ADD_TO_LIST',
    wordId: wordId,
    wordData: wordData
  };
};

const wordUpdate = (wordId, wordData) => {
  return {
    type: 'BOOK_UPDATE_IN_LIST',
    wordId: wordId,
    wordData: wordData
  };
};

const wordDelete = (wordId) => {
  return {
    type: 'BOOK_DELETE_FROM_LIST',
    wordId: wordId
  };
};

export {
  fetchWords,
  wordAdd,
  wordUpdate,
  wordDelete
};