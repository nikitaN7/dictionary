type FilterItem = { [key: string]: any };
type FilterFunctions = Array<(value: FilterItem) => boolean>;

export const filterList = (
  list: FilterItem,
  ...filters: FilterFunctions
): FilterItem[] => {
  const filteredKeys = Object.keys(list).filter((key: string) => {
    return filters.every(fn => {
      return fn(list[Number(key)]);
    });
  });

  return filteredKeys.reduce((arr: FilterItem[], key) => {
    const oldList = arr.map(item => ({ ...item }));

    return [...oldList, list[Number(key)]];
  }, []);
};
