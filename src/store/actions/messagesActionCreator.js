import {
  addMessageSuccess,
  addMessageFailure,
  editMessageSuccess,
  editMessageFailure,
  deleteMessageSuccess,
  deleteMessageFailure,
  fetchMessagesBegin,
  fetchMessagesSuccess,
  fetchMessagesFailure
} from "./messagesActions";
import axios from "axios";

const loopBack = "http://localhost:3001/api";

export function addMessage(message) {
  message.date = new Date().toISOString();
  console.log(message);

  return (dispatch, getState) => {
    const token = getState().users.user.id;
    const author = getState().users.user.user.userName;
    const authorId = getState().users.user.userId;
    const newMessage = { ...message, author, authorId };
    axios
      .request({
        method: "post",
        url: loopBack + "/messages?access_token=" + token,
        data: newMessage
      })
      .then(response => {
        console.log(response);
        return dispatch(addMessageSuccess(response.data));
      })
      .catch(error => {
        dispatch(addMessageFailure(error));
        //Some error occurred
      });
  };
}

export function editMessage(message) {
  console.log(message.id);
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    axios
      .request({
        method: "patch",
        url: loopBack + "/messages/" + message.id + "?access_token=" + token,
        data: message
      })
      .then(() => {
        return dispatch(editMessageSuccess(message));
      })
      .catch(error => {
        dispatch(editMessageFailure(error));
        //Some error occurred
      });
  };
}

export function deleteMessage(message) {
  console.log(message.id);
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    axios
      .request({
        method: "delete",
        url: loopBack + "/messages/" + message.id + "?access_token=" + token
      })
      .then(() => {
        return dispatch(deleteMessageSuccess(message));
      })
      .catch(error => {
        dispatch(deleteMessageFailure(error));
        //Some error occurred
      });
  };
}

export function fetchMessages() {
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    dispatch(fetchMessagesBegin());
    return axios
      .get(loopBack + "/messages?access_token=" + token)
      .then(response => {
        // console.log(response.data);
        return dispatch(fetchMessagesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchMessagesFailure(error));
        //Some error occurred
      });
  };
}
