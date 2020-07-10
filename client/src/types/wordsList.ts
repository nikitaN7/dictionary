import * as actions from '../actions/actions';

export type Word = {
  examples: {
    ru: string;
    en: string;
  };
  association: string | null;
  transcription: string | null;
  bookmarks: boolean;
  en: string;
  ru: string;
  id: number;
  repetition: number;
};

export interface WordsListState {
  pending: boolean;
  error: any;
  words: Word[];
}

interface PendingAction {
  type:
    | typeof actions.FETCH_WORDS_PENDING
    | typeof actions.DELETE_WORDS_PENDING
    | typeof actions.UPDATE_LIST_PENDING;
}

interface ErrorAction {
  type:
    | typeof actions.FETCH_WORDS_FAILURE
    | typeof actions.DELETE_WORDS_FAILURE
    | typeof actions.UPDATE_LIST_FAILURE;
  payload: any;
}

interface FetchWordsSuccessAction {
  type: typeof actions.FETCH_WORDS_SUCCESS;
  payload: Word[];
}

interface DeleteWordsSuccessAction {
  type: typeof actions.DELETE_WORDS_SUCCESS;
}

interface WordAddSuccessAction {
  type: typeof actions.WORDS_ADD_SUCCESS;
  wordData: Word;
}

interface WordUpdateSuccessAction {
  type: typeof actions.WORDS_UPDATE_SUCCESS;
  wordId: number;
  wordData: Word;
}

interface WordDeleteSuccessAction {
  type: typeof actions.WORDS_DELETE_SUCCESS;
  wordId: number;
}

export type RepetitionActionTypes =
  | PendingAction
  | ErrorAction
  | FetchWordsSuccessAction
  | DeleteWordsSuccessAction
  | WordAddSuccessAction
  | WordUpdateSuccessAction
  | WordDeleteSuccessAction;
