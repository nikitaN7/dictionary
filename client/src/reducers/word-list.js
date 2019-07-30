const updateWordItem = (words, wordId, {wordData}) => {

  const oldWord = words[wordId];

  const newWord = {
    ...oldWord,
    ...wordData
  }

  return [
    ...words.slice(0, wordId),
    newWord,
    ...words.slice(wordId + 1)
  ]
}

const removeWordItem = (words, wordId) => {
  return [
    ...words.slice(0, wordId),
    ...words.slice(wordId + 1)
  ]
}

const addWordItem = (words, wordId, {wordData}) => {

  const idList = words.map(item => item.id);
  const maxId = Math.max(...idList, 0);

  return [
    ...words,
    {...wordData, id: maxId + 1 }
  ]
}

const updateList = (state, action, getWordsList) => {

  const words = state.words;
  const wordIdx = words.findIndex(({id}) => id === action.wordId);

  return {
    ...state,
    words: getWordsList(words, wordIdx, action)
  };
}

const updateWordList = (state, action) => {

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

    case 'BOOK_UPDATE_IN_LIST':
      return updateList(state, action, updateWordItem)

    case 'BOOK_DELETE_FROM_LIST':
      return updateList(state, action, removeWordItem)

    case 'BOOK_ADD_TO_LIST':
      return updateList(state, action, addWordItem)

    default:
      return state;

  }
}

export default updateWordList;