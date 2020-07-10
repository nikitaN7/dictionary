import { combineReducers, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import wordList from './word-list';
import wordsRepetition from './wordsRepetitionReducer';
import user from './user';

import { LOGOUT } from '../actions/actions';

const appReducer = combineReducers({
  wordList,
  wordsRepetition,
  user
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
