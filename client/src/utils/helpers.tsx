export const shuffle = (arr: any) => {
  const copyArray = [...arr];
  return copyArray.sort(() => 0.5 - Math.random());
};
