import { SET_REPETITION_DATA } from '../actions/actions';

export type WordId = string | number | null;
export type TypeId = number | string;
export type AnswerId = string | number | null;

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

export interface IWordsList {
  [key: string]: Word;
}

export interface ITestInfo {
  hasErrors: boolean;
  errorNumbers: number;
}

export interface AnswerData {
  selected?: boolean;
  successAnswerId?: AnswerId;
  errorAnswerId?: AnswerId;
}

export interface Answer {
  key: string;
  correct: boolean;
  wordId: number | string;
}

export interface IQueue {
  id: number | string;
  type: number | string;
  uniqId: string;
}

export interface IRepetitionType {
  typeId: number | string;
  title: string;
  name: string;
  lang: 'ru' | 'en';
  speakers: boolean;
}

export interface IWordExamples {
  en?: string;
  ru?: string;
}

export interface IWrapperChildren {
  type?: string;
  lang: 'ru' | 'en';
  wordId: WordId;
  wordsList: IWordsList;
  handleCompleteTest: (testInfo: ITestInfo) => void;
}

export type WordsRepetitionState = {
  queue: Array<IQueue>;
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
