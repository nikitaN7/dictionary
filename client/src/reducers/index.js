import { combineReducers } from 'redux';
import wordList from './word-list';
import wordsRepetition from './wordsRepetitionReducer';
import user from './user';

import { LOGOUT } from '../actions/actions';

const appReducer = combineReducers({
  wordList,
  wordsRepetition,
  user
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
