export const filterList = (list, filterFn) => {
  const filteredKeys = Object
    .keys(list)
    .filter(key => filterFn(list[key]));

  return filteredKeys.reduce((arr, key) => {
    let oldList = arr.map(item => ({ ...item }));

    return [
      ...oldList,
      list[key]
    ]
  }, []);
}