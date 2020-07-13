import {
  UPDATE_LIST_PENDING,
  UPDATE_LIST_FAILURE,
  WORDS_ADD_SUCCESS,
  WORDS_UPDATE_SUCCESS,
  WORDS_DELETE_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';

import { ThunkType } from '../reducers/index';

import { Word, NewWord, RepetitionActionTypes } from '../types/wordsList';

const wordsApi = new WordsApi();

const transformWordData = (data: any): any => {
  return {
    id: data.id,
    en: data.en,
    ru: data.ru,
    bookmarks: data.bookmarks,
    association: data.association,
    transcription: data.transcription,
    examples: {
      ru: data.ruExample,
      en: data.enExample
    }
  };
};

const updateListPending = (): RepetitionActionTypes => {
  return {
    type: UPDATE_LIST_PENDING
  };
};

const updateListError = (error: any): RepetitionActionTypes => {
  return {
    type: UPDATE_LIST_FAILURE,
    payload: error
  };
};

const wordAddSuccess = (wordData: Word): RepetitionActionTypes => {
  return {
    type: WORDS_ADD_SUCCESS,
    wordData
  };
};

const wordUpdateSuccess = (
  wordId: number,
  wordData: Word
): RepetitionActionTypes => {
  return {
    type: WORDS_UPDATE_SUCCESS,
    wordId,
    wordData
  };
};

const wordDeleteSuccess = (wordId: number) => {
  return {
    type: WORDS_DELETE_SUCCESS,
    wordId
  };
};

const wordAdd = (
  wordData: NewWord,
  modalClose: () => void,
  modalReset: () => void,
  scrollToBottom: (idx: number) => void
): ThunkType => async (dispatch, getState) => {
  const { words } = getState().wordList;

  dispatch(updateListPending());

  try {
    const res = await wordsApi.addWords(
      transformWordData({
        ...wordData
      })
    );

    dispatch(wordAddSuccess(res.data.data));
    modalClose();
    modalReset();
    scrollToBottom(Number((words.length / 10).toFixed()));
  } catch (error) {
    dispatch(updateListError(error.message));
  }
};

const wordUpdate = (
  word: Word,
  wordData: NewWord,
  modalClose: () => void
): ThunkType => async dispatch => {
  dispatch(updateListPending());

  try {
    const res = await wordsApi.updateWord(word.id, {
      data: transformWordData({ ...wordData })
    });

    dispatch(wordUpdateSuccess(word.id, res.data.data));
    modalClose();
  } catch (error) {
    dispatch(updateListError(error.message));
  }
};

const wordDelete = (
  word: Word,
  modalClose: () => void
): ThunkType => async dispatch => {
  dispatch(updateListPending());

  try {
    await wordsApi.deleteOneWord(word.id);
    dispatch(wordDeleteSuccess(word.id));
    modalClose();
  } catch (error) {
    dispatch(updateListError(error.message));
  }
};

export { wordAdd, wordUpdate, wordDelete };
