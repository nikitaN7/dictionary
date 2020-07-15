import { createSelector } from 'reselect';
import { RootState } from './reducers/index';

export const getWords = (state: RootState) => state.wordList.words;

export const getSortedWords = createSelector([getWords], words => {
  return words.sort((a, b) => a.id - b.id);
});
