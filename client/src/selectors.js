import { createSelector } from 'reselect';

export const getWords = state => state.wordList.words;

export const getSortedWords = createSelector(
  [getWords],
  words => {
    return words.sort((a, b) => a.id - b.id);
  }
);
