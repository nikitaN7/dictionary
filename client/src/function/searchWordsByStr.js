import { filterList } from './filterList';

export const searchWordsByStr = (words, str) => {

  if (str === '') {
    return words;
  }

  const searchFilter = (word) => {
    const { en, ru } = word;
    return en.indexOf(str) !== -1 || ru.indexOf(str) !== -1;
  }

  return filterList(words, searchFilter);
}