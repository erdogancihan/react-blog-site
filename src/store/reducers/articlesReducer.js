import {
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAILURE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SHOW_ARTICLE_SUCCESS
} from "../actions/articlesActions";

const initialState = {
  loading: false,
  articles: [],
  error: null,
  view: {
    single: "",
    all: true,
    monthly: "",
    category:""
  }
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.articles
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ADD_ARTICLE_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        error: null,
        articles: [...state.articles, action.article]
      };
    case ADD_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case EDIT_ARTICLE_SUCCESS:
      console.log(action);
      let editedArticles = state.articles.filter(article => {
        return article.id !== action.article.id;
      });
      return {
        loading: false,
        error: null,
        view:state.view,
        articles: [...editedArticles, action.article]
      };
    case EDIT_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case DELETE_ARTICLE_SUCCESS:
      let newArticles = state.articles.filter(article => {
        return article.id !== action.article.id;
      });
      return {
        error: null,
        loading: false,
        view:state.view,
        articles: newArticles
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SHOW_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        view: action.view
      };
    default:
      return state;
  }
};

export default articles;
