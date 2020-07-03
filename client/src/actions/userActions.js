import { SIGN_IN, SIGN_UP, LOGOUT } from './actions';
import AuthApi from '../api/authApi';

const authApi = new AuthApi();

const signinAction = token => {
  return {
    type: SIGN_IN,
    payload: {
      token
    }
  };
};

const signupAction = token => {
  return {
    type: SIGN_UP,
    payload: {
      token
    }
  };
};

export const signin = (email, password) => async dispatch => {
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

export const signup = (email, password) => async dispatch => {
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

export const logout = redirectCb => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  redirectCb();
};
