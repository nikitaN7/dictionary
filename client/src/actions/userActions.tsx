import { SIGN_IN, SIGN_UP, LOGOUT } from './actions';
import AuthApi from '../api/authApi';
import { Dispatch } from 'redux';

import { Token, UserActionTypes } from '../types/user';

const authApi = new AuthApi();

export const signinAction = (token: Token): UserActionTypes => {
  return {
    type: SIGN_IN,
    payload: {
      token
    }
  };
};

export const signupAction = (token: Token): UserActionTypes => {
  return {
    type: SIGN_UP,
    payload: {
      token
    }
  };
};

export const signin = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await authApi.signIn(email, password);

    const { token } = res.data;
    dispatch(signinAction(token));
    localStorage.setItem('token', token);

    return { success: true };
  } catch (error) {
    const errMessage = error.response.data.error || error.message;
    return { success: false, error: errMessage };
  }
};

export const signup = (email: 'string', password: 'string') => async (
  dispatch: Dispatch
) => {
  try {
    const res = await authApi.signUp(email, password);

    const { token } = res.data;
    dispatch(signupAction(token));
    localStorage.setItem('token', token);
    return { success: true };
  } catch (error) {
    const errMessage = error.response.data.error || error.message;
    return { success: false, error: errMessage };
  }
};

export const logout = (redirectCb: () => void) => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  redirectCb();
};
