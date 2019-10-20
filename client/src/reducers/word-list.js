import * as actions from '../actions/actions';

const updateWordItem = (words, wordIdx, { wordData }) => {
  const oldWord = words[wordIdx];

  const newWord = {
    ...oldWord,
    ...wordData
  };

  return [
    ...words.slice(0, wordIdx), //
    newWord,
    ...words.slice(wordIdx + 1)
  ];
};

const removeWordItem = (words, wordIdx) => {
  return [
    ...words.slice(0, wordIdx), //
    ...words.slice(wordIdx + 1)
  ];
};

const addWordItem = (words, wordIdx, { wordData, wordId }) => {
  return [
    ...words, //
    { ...wordData, id: wordId }
  ];
};

const updateList = (state, action, getWordsList) => {
  const { words } = state;
  const wordIdx = words.findIndex(({ id }) => id === action.wordId);

  return {
    ...state,
    pending: false,
    error: null,
    words: getWordsList(words, wordIdx, action)
  };
};

const initialState = {
  pending: false,
  error: null,
  words: []
};

const updateWordList = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_WORDS_PENDING:
    case actions.UPDATE_LIST_PENDING:
    case action.DELETE_WORDS_PENDING:
      return {
        ...state,
        pending: true
      };

    case actions.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        words: action.payload
      };

    case actions.DELETE_WORDS_SUCCESS:
      return {
        ...initialState
      };

    case actions.FETCH_WORDS_FAILURE:
    case actions.UPDATE_LIST_FAILURE:
    case actions.DELETE_WORDS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    case actions.WORDS_UPDATE_SUCCESS:
      return updateList(state, action, updateWordItem);

    case actions.WORDS_DELETE_SUCCESS:
      return updateList(state, action, removeWordItem);

    case actions.WORDS_ADD_SUCCESS:
      return updateList(state, action, addWordItem);

    default:
      return state;
  }
};

export default updateWordList;
