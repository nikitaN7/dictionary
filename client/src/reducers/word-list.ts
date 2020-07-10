import * as actions from '../actions/actions';

import {
  Word,
  WordsListState,
  RepetitionActionTypes
} from '../types/wordsList';

type GetWordsListType = (words: Word[], wordIdx: number, action: any) => Word[];

const updateWordItem = (
  words: Word[],
  wordIdx: number,
  { wordData }: any
): Word[] => {
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

const removeWordItem = (words: Word[], wordIdx: number): Word[] => {
  return [
    ...words.slice(0, wordIdx), //
    ...words.slice(wordIdx + 1)
  ];
};

const addWordItem = (
  words: Word[],
  wordIdx: number,
  { wordData }: any
): Word[] => {
  return [...words, wordData];
};

const updateList = (
  state: WordsListState,
  action: any,
  getWordsList: GetWordsListType
) => {
  const { words } = state;
  const wordIdx = words.findIndex(({ id }) => id === action.wordId);

  return {
    ...state,
    pending: false,
    error: null,
    words: getWordsList(words, wordIdx, action)
  };
};

const initialState: WordsListState = {
  pending: false,
  error: null,
  words: []
};

const updateWordList = (
  state = initialState,
  action: RepetitionActionTypes
): WordsListState => {
  switch (action.type) {
    case actions.FETCH_WORDS_PENDING:
    case actions.UPDATE_LIST_PENDING:
    case actions.DELETE_WORDS_PENDING:
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
