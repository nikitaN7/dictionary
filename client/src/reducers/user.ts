import * as actions from '../actions/actions';
import { UserState, UserActionTypes } from '../types/user';

const initialState: UserState = {
  token: null
};

const user = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case actions.SIGN_IN: {
      const { token } = action.payload;

      return {
        ...state,
        token
      };
    }

    case actions.SIGN_UP: {
      const { token } = action.payload;

      return {
        ...state,
        token
      };
    }

    default:
      return state;
  }
};

export default user;
