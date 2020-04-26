import { combineReducers } from 'redux';
import wordList from './word-list';
import wordsRepetition from './wordsRepetitionReducer';

export default combineReducers({
  wordList,
  wordsRepetition
});
