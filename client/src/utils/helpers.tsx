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
