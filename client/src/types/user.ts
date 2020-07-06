import * as actions from '../actions/actions';

export interface UserState {
  token: string | null;
}

export type Token = string;

interface SignInAction {
  type: typeof actions.SIGN_IN;
  payload: {
    token: Token;
  };
}

interface SignUpAction {
  type: typeof actions.SIGN_UP;
  payload: {
    token: Token;
  };
}

export type UserActionTypes = SignInAction | SignUpAction;
