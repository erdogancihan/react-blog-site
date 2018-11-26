import {
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAILURE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
  FETCH_MESSAGES_BEGIN,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE
} from "../actions/messagesActions";

const initialState = {
  loading: false,
  messages: [],
  error: null
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.messages
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ADD_MESSAGE_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        error: null,
        messages: [...state.messages, action.message]
      };
    case ADD_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case EDIT_MESSAGE_SUCCESS:
      console.log(action);
      let editedmessages = state.MESSAGES.filter(message => {
        return message.id !== action.MESSAGE.id;
      });
      return {
        loading: false,
        error: null,
        view: state.view,
        messages: [...editedmessages, action.message]
      };
    case EDIT_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case DELETE_MESSAGE_SUCCESS:
      let newMessages = state.messages.filter(message => {
        return message.id !== action.message.id;
      });
      return {
        error: null,
        loading: false,
        view: state.view,
        messages: newMessages
      };
    case DELETE_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default messages;
