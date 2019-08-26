const bookmarksFilter = (word) => word.bookmarks === true;

const filterList = (list, filterFn) => {
  let updateList = [];

  const filtered = Object.keys(list)
    .filter(key => filterFn(list[key]))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: list[key]
      };
    }, {});

  for (let item in filtered) {
    updateList.push(filtered[item])
  }

  return updateList;
}

export const filterWordsByType = (words, type) => {
  let updateWords = [];

  if (type === 'hard-words') {
    return filterList(words, bookmarksFilter);
  }

  return words;
}