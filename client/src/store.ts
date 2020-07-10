import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import { RootState } from './reducers/index';

const logMiddleware: Middleware = ({ getState }) => next => action => {
  console.log(action.type, getState());
  return next(action);
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logMiddleware))
);

export default store;
