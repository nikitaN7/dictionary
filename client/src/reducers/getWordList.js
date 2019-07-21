const getWordList = (state, action) => {

  if (state === undefined) {
    return {
      words: [],
      error: null
    }
  }

  switch (action.type) {
    case 'FETCH_WORDS_SUCCESS':
      return {
        words: action.payload,
        error: null
      };

    case 'FETCH_WORDS_FAILURE':
      return {
        words: [],
        error: action.payload
      };

    default:
      return state.wordList

  }
}

export default getWordList;