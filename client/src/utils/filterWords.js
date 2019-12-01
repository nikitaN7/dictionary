import { filterList } from './filterList';

const searchFilter = (word, str) => {
  const translates = [word.en, word.ru];

  return translates.some(item => {
    return item.toLowerCase().indexOf(str.toLowerCase()) !== -1;
  });
};

const bookmarksFilter = word => word.bookmarks === true;

export const filterWords = (words, options) => {
  const filters = [];
  const { filterSearch: str, filterType: type } = options;

  if (str !== '') {
    filters.push((...args) => searchFilter.call(null, ...args, str));
  }

  if (type === 'hard-words') {
    filters.push(bookmarksFilter);
  }

  return filters.length > 0 ? filterList(words, ...filters) : words;
};
