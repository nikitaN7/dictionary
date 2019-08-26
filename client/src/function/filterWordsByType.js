import { filterList } from './filterList';

export const filterWordsByType = (words, type) => {

  const bookmarksFilter = (word) => word.bookmarks === true;

  if (type === 'hard-words') {
    return filterList(words, bookmarksFilter);
  }

  return words;
}