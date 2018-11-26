import React, { Component } from "react";
import Article from "./article";

class ListArticles extends Component {
  render() {
    const { articles, handleDelete, user,strings } = this.props;

    return (
      <div>
        {articles &&
          articles.map(article => {
            return (article = (
              <Article
                key={article.id}
                article={article}
                handleDelete={handleDelete}
                user={user}
                strings={strings}
              />
            ));
          })}
      </div>
    );
  }
}

export default ListArticles;
