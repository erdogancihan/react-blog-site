import { SHOW_ARTICLE_SUCCESS } from "../actions/articlesActions";

const initialState = {
  view: {
    single: "",
    all: true,
    monthly: "",
    category: ""
  }
};

const views = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ARTICLE_SUCCESS:
      return {
        view: action.view
      };
    default:
      return state;
  }
};

export default views;
