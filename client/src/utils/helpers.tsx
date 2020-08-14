export const shuffle = (arr: any) => {
  const copyArray = [...arr];
  return copyArray.sort(() => 0.5 - Math.random());
};

export const authHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

export const getRandomItems = (list: any[], n: number) => {
  const shuffled = shuffle(list);
  return shuffled.slice(0, n);
};

export const checkKeyIsNumber = (key: any) => {
  let convertedKey = Number(key);

  if (isNaN(convertedKey) || key === null || key === ' ') {
    return false;
  }

  return true;
};
