import {
  addArticleSuccess,
  addArticleFailure,
  editArticleSuccess,
  editArticleFailure,
  deleteArticleSuccess,
  deleteArticleFailure,
  fetchArticlesBegin,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  showArticleSuccess
} from "./articlesActions";
import axios from "axios";

const loopBack = "http://localhost:3001/api";

export function addArticle(article) {
  article.date = new Date().toISOString();
  console.log(article);
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    const author = getState().users.user.user.userName;
    const authorId = getState().users.user.userId;
    const newArticle = { ...article, author, authorId };
    axios
      .request({
        method: "post",
        url: loopBack + "/articles?access_token=" + token,
        data: newArticle
      })
      .then(response => {
        console.log(response);
        return dispatch(addArticleSuccess(response.data));
      })
      .catch(error => {
        dispatch(addArticleFailure(error));
        //Some error occurred
      });
  };
}

export function editArticle(article) {
  console.log(article.id);
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    axios
      .request({
        method: "patch",
        url: loopBack + "/articles/" + article.id + "?access_token=" + token,
        data: article
      })
      .then(() => {
        return dispatch(editArticleSuccess(article));
      })
      .catch(error => {
        dispatch(editArticleFailure(error));
        //Some error occurred
      });
  };
}

export function deleteArticle(article) {
  console.log(article.id);
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    axios
      .request({
        method: "delete",
        url: loopBack + "/articles/" + article.id + "?access_token=" + token
      })
      .then(() => {
        return dispatch(deleteArticleSuccess(article));
      })
      .catch(error => {
        dispatch(deleteArticleFailure(error));
        //Some error occurred
      });
  };
}

export function fetchArticles() {
  return (dispatch, getState) => {
    const token = getState().users.user.id;
    const language = getState().language.language;
    let filter = `[where][lang]=${language}&[access_token]=${token}`;
    dispatch(fetchArticlesBegin());
    return axios
      .get(loopBack + "/articles?filter" + filter)
      .then(response => {
        return dispatch(fetchArticlesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchArticlesFailure(error));
        //Some error occurred
      });
  };
}

export function showArticle(view) {
  return dispatch => {
    dispatch(showArticleSuccess(view));
  };
}
