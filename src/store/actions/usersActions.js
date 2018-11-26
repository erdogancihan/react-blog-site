export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user
});
export const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  error
});
export const signInSuccess = user => ({
  type: SIGNIN_SUCCESS,
  user
});
export const signInFailure = error => ({
  type: SIGNIN_FAILURE,
  error
});
export const logOutSuccess = token => ({
  type: LOGOUT_SUCCESS,
  token
});
export const logOutFailure = error => ({
  type: LOGOUT_FAILURE,
  error
});
