export const filterList = (list, filterFn) => {
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