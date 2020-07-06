import { SET_REPETITION_DATA } from '../actions/actions';

export type Queue = {
  id: number | string;
  type: number | string;
};

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
  id: string | number;
  repetition: number;
};

export type WordsRepetitionState = {
  queue: Array<Queue>;
  words: {
    [key: string]: Word;
  };
};

interface SetRepetitionDataAction {
  type: typeof SET_REPETITION_DATA;
  payload: {
    data: WordsRepetitionState;
  };
}

export type RepetitionActionTypes = SetRepetitionDataAction;
