import {
  UPDATE_LIST_PENDING,
  UPDATE_LIST_FAILURE,
  WORDS_ADD_SUCCESS,
  WORDS_UPDATE_SUCCESS,
  WORDS_DELETE_SUCCESS
} from './actions';
import WordsApi from '../api/wordsApi';

const wordsApi = new WordsApi();

const transformWordData = data => {
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

const wordAddSuccess = wordData => {
  return {
    type: WORDS_ADD_SUCCESS,
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

const wordAdd = (wordData, modalClose, modalReset, scrollToBottom) => async (
  dispatch,
  getState
) => {
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
    scrollToBottom((words.length / 10).toFixed());
  } catch (error) {
    dispatch(updateListError(error.message));
  }
};

const wordUpdate = (word, wordData, modalClose) => async dispatch => {
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

const wordDelete = (word, modalClose) => async dispatch => {
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
