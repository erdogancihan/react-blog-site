export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";
export const EDIT_MESSAGE_SUCCESS = "EDIT_MESSAGE_SUCCESS";
export const EDIT_MESSAGE_FAILURE = "EDIT_MESSAGE_FAILURE";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";
export const FETCH_MESSAGES_BEGIN = "FETCH_MESSAGES_BEGIN";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const addMessageSuccess = message => ({
  type: ADD_MESSAGE_SUCCESS,
  message
});
export const addMessageFailure = error => ({
  type: ADD_MESSAGE_FAILURE,
  error
});
export const editMessageSuccess = message => ({
  type: EDIT_MESSAGE_SUCCESS,
  message
});
export const editMessageFailure = error => ({
  type: EDIT_MESSAGE_FAILURE,
  error
});
export const deleteMessageSuccess = message => ({
  type: DELETE_MESSAGE_SUCCESS,
  message
});
export const deleteMessageFailure = error => ({
  type: DELETE_MESSAGE_FAILURE,
  error
});
export const fetchMessagesBegin = () => ({
  type: FETCH_MESSAGES_BEGIN
});

export const fetchMessagesSuccess = messages => ({
  type: FETCH_MESSAGES_SUCCESS,
  messages
});

export const fetchMessagesFailure = error => ({
  type: FETCH_MESSAGES_FAILURE,
  error
});
