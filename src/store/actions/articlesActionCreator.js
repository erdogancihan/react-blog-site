import { showArticleSuccess } from "./articlesActions";

export const addArticle = article => {
  article.date = new Date().toISOString();
  console.log(article);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const author = getState().firestore.data.user.userName;
    const authorId = getState().firebase.auth.uid;
    const newArticle = { ...article, author, authorId };

    console.log(newArticle);
    firestore
      .collection("articles")
      .add(newArticle)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export function editArticle(article) {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
console.log(article)
    fireStore
      .update({ collection: "articles", doc: article.id }, article)
      .then(resp => {
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteArticle(article) {
  console.log(article.id);

  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .delete({ collection: "articles", doc: article.id })
      .then(resp => {
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };
}
/*
export function fetchArticles() {
  
  return (dispatch, getState, { getFirestore }) => {
    const language = getState().language.language;
    const fireStore = getFirestore();
    console.log(language)
    fireStore
      .get({
        collection: "articles",
        where: ["language", "==", language],
        orderBy: ["date","desc"]
      })
      .then(response => {
        return console.log(response);
      })
      .catch(error => {
        return console.log(error);
      });
  };
}
*/
export function showArticle(view) {
  return dispatch => {
    dispatch(showArticleSuccess(view));
  };
}
