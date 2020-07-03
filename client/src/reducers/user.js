import * as actions from '../actions/actions';

const initialState = {
  token: null
};

const user = (state = initialState, action) => {
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
