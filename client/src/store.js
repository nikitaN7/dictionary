import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const logMiddleware = ({ getState }) => (next) => (action) => {
  console.log(action.type, getState());
  return next(action);
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logMiddleware))
);


export default store;
