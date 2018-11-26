import axios from "axios";

import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logOutSuccess,
  logOutFailure
} from "./usersActions";

const loopBack = "http://localhost:3001/api";

export function signUpUser(user) {
  let userEmail = user.email;
  let userPassword = user.password;
  let userName = user.userName;
  let credentials = {
    email: userEmail,
    password: userPassword,
    userName: userName
  };
  console.log(credentials);
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/blogusers",
        data: credentials
      })
      .then(response => {
        return dispatch(signUpSuccess(response.data));
      })
      //signIn user after signup
      .then(() => {
        return dispatch(signInUser(user));
      })

      .catch(error => {
        return dispatch(signUpFailure(error));
      });
  };
}

export function signInUser(user) {
  let userEmail = user.email;
  let userPassword = user.password;
  let credentials = {
    email: userEmail,
    password: userPassword
  };
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/blogusers/login?include=user",
        data: credentials
      })
      .then(response => {
        //sets user data to local storage
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.user.userName);
        localStorage.setItem("email", response.data.user.email);
        return dispatch(signInSuccess(response.data));
      })
      .catch(error => {
        return dispatch(signInFailure(error));
      });
  };
}

//if session information is lost it gets data from localstorage and set user data
export function setToken() {
   return dispatch => {
    let id = localStorage.getItem("id");
    let userId = localStorage.getItem("userId");
    let userName = localStorage.getItem("userName");
    let email = localStorage.getItem("email");
    let user = { id, userId, user: { email, userName } };
    return dispatch(signInSuccess(user));
  };
}

export function logOut() {
  
  return (dispatch,getState) => {
    const token = getState().users.user.id;
    axios
      .request({
        method: "post",
        url: loopBack + "/blogusers/logout?access_token=" + token
      })
      .then(() => {
          //sets user data to local storage
          localStorage.clear();
        return dispatch(logOutSuccess(token));
      })
      .catch(error => {
        return dispatch(logOutFailure(error));
      });
  };
}
