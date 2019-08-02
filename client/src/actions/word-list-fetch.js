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

export const fetchWords = () => (dispatch) => {
  fetch('/api/getData')
    .then((data) => data.json())
    .then((res)  => dispatch(wordsLoaded(res.data)))
    .catch((err) => dispatch(wordsError(err)));
};