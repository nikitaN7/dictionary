export const getMaxId = arr => {
  const idList = arr.map(item => item.id);
  return Math.max(...idList, 0);
};
