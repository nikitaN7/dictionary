export const filterList = (list, ...filters) => {
  const filteredKeys = Object.keys(list).filter(key => {
    return filters.every(fn => {
      return fn(list[key]);
    });
  });

  return filteredKeys.reduce((arr, key) => {
    const oldList = arr.map(item => ({ ...item }));

    return [...oldList, list[key]];
  }, []);
};
