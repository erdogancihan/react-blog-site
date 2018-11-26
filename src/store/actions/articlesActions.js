export const ADD_ARTICLE_SUCCESS = "ADD_ARTICLE_SUCCESS";
export const ADD_ARTICLE_FAILURE = "ADD_ARTICLE_FAILURE";
export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS";
export const EDIT_ARTICLE_FAILURE = "EDIT_ARTICLE_FAILURE";
export const DELETE_ARTICLE_SUCCESS = "DELETE_ARTICLE_SUCCESS";
export const DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE";
export const FETCH_ARTICLES_BEGIN = "FETCH_ARTICLES_BEGIN";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const SHOW_ARTICLE_SUCCESS = "SHOW_ARTICLE_SUCCESS";

export const addArticleSuccess = article => ({
  type: ADD_ARTICLE_SUCCESS,
  article
});
export const addArticleFailure = error => ({
  type: ADD_ARTICLE_FAILURE,
  error
});
export const editArticleSuccess = article => ({
  type: EDIT_ARTICLE_SUCCESS,
  article
});
export const editArticleFailure = error => ({
  type: EDIT_ARTICLE_FAILURE,
  error
});
export const deleteArticleSuccess = article => ({
  type: DELETE_ARTICLE_SUCCESS,
  article
});
export const deleteArticleFailure = error => ({
  type: DELETE_ARTICLE_FAILURE,
  error
});
export const fetchArticlesBegin = () => ({
  type: FETCH_ARTICLES_BEGIN
});

export const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  articles
});

export const fetchArticlesFailure = error => ({
  type: FETCH_ARTICLES_FAILURE,
  error
});
export const showArticleSuccess = view => ({
  type: SHOW_ARTICLE_SUCCESS,
  view
});