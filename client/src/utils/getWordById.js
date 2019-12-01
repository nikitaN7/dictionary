export const getWordById = (list, id) => {
  let word = {};

  list.forEach(item => {
    if (item.id === id) {
      word = item;
    }
  });

  return word;
};
