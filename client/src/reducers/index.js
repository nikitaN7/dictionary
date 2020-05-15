import { combineReducers } from 'redux';
import wordList from './word-list';
import wordsRepetition from './wordsRepetitionReducer';
import user from './user';

export default combineReducers({
  wordList,
  wordsRepetition,
  user
});
