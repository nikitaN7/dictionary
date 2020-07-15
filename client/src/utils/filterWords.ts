import { filterList } from './filterList';
import { Word } from '../types/wordsList';

const searchFilter = (word: Word, str: string) => {
  const translates = [word.en, word.ru];

  return translates.some(item => {
    return item.toLowerCase().indexOf(str.toLowerCase()) !== -1;
  });
};

const bookmarksFilter = (word: Word) => word.bookmarks === true;

export const filterWords = (
  words: Word[],
  options: {
    filterSearch: string;
    filterType: string;
  }
): Word[] => {
  const filters = [];
  const { filterSearch: str, filterType: type } = options;

  if (str !== '') {
    filters.push((word: Word) => {
      return searchFilter.call(null, word, str);
    });
  }

  if (type === 'hard-words') {
    filters.push(bookmarksFilter);
  }

  return filters.length > 0
    ? (filterList(words, ...(filters as any)) as any)
    : words;
};
