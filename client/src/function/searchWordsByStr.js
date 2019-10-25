import { filterList } from './filterList';

export const searchWordsByStr = (words, str) => {
  const searchFilter = word => {
    const translates = [word.en, word.ru];

    return translates.some(item => {
      return item.toLowerCase().indexOf(str.toLowerCase()) !== -1;
    });
  };

  if (str !== '') {
    return filterList(words, searchFilter);
  }

  return words;
};
