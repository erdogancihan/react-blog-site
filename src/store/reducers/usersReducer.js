import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/usersActions";

const initialState = {
  user: {},
  error: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.user
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error: null,
        user: { id: null, userId: null, user: null }
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default users;
