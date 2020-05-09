const getWordById = (list, id) => {
  let word = {};

  list.forEach((item) => {
    if (parseInt(item.id) === id) {
      word = item;
    }
  });

  return word;
};

const getMaxId = (arr) => {
  const idList = arr.map((item) => item.id);
  return Math.max(...idList, 0);
};

const getDbRoute = () => {
  return `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}?retryWrites=true&w=majority`;
};

module.exports = { getWordById, getMaxId, getDbRoute };
