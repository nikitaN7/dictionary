import { SET_REPETITION_DATA } from './actions';
import { shuffle } from '../utils/helpers';

const setRepetitionDataAction = data => {
  return {
    type: SET_REPETITION_DATA,
    payload: {
      data
    }
  };
};

export const setRepetitionData = selectedWords => (dispatch, getState) => {
  const wordsData = {};
  const queueData = [];
  const { words } = getState().wordList;

  const filteredWords = words.filter(({ id }) => selectedWords.includes(id));

  filteredWords.forEach(word => {
    const wordData = { ...word };
    const queue = {
      id: word.id,
      type: 1
    };

    wordData.repetition = 3;
    wordsData[word.id] = wordData;

    queueData.push(queue);
  });

  const data = {
    queue: shuffle(queueData),
    words: wordsData
  };

  dispatch(setRepetitionDataAction(data));
};
