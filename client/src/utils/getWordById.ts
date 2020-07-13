import { Word } from '../types/wordsList';

export const getWordById = (list: Word[], id: number | null): Word | null => {
  return list.find(item => item.id === id) || null;
};
