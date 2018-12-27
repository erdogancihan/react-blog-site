import React from "react";
import { connect } from "react-redux";

import { showArticle } from "../../store/actions/articlesActionCreator";
import LastArticle from "./lastArticle";

const LastArticles = ({ articles, showArticle, strings }) => {
   const handleShowArticle = id => {
    let view = {
      single: id,
      all: false,
      monthly: "",
      category: ""
    };
    showArticle(view);
  };
  return (
    <div className="sidenav">
      <h4>
        <i className="far fa-clock" />
        <span> </span> {strings.strings.sidebar.lastArticles}
      </h4>
      <ul>
        {articles &&
          articles.map(article => {
            return (
              <LastArticle
                key={article.id}
                article={article}
                handleShowArticle={handleShowArticle}
                strings={strings}
              />
            );
          })}
      </ul>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    articles: state.firestore.ordered.articles,
    strings: state.language
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showArticle: id => dispatch(showArticle(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastArticles);
