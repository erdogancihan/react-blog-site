import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet";

import MessagesContainer from "../messages/messagesContainer";

class Article extends Component {
  state = {
    togleview: true,
    className: "article-content-visible",
    classNameButton: "readMore",
    classNameAdmin: "readMore",
   };
  render() {
    const { article, handleDelete, user, strings } = this.props;
console.log(article.id)
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <title>{article.title}</title>
          <meta name="description" content={article.description} />
          <link
            rel="canonical"
            href={"http://myblogsite.com/article" + article.id}
          />
        </Helmet>
        <div className="article-container">
          <div className="article-title">
            <Link to={"/article" + article.id}>
              <h1>{article.title}</h1>
            </Link>
          </div>
          <div className="flex-container">
            <div className="article-author">
              {" "}
              <p>
                <i className="fas fa-pencil-alt" /> <span> </span>{" "}
                {article.author}{" "}
              </p>
            </div>
            <div className="article-date">
              {" "}
              <p>
                <i className="far fa-calendar-alt" />
                <span> </span> {moment(article.date).format("ll")}
              </p>
            </div>
          </div>

          <div
            className={this.state.className}
            id={`article-content${article.key}`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="article-author">
            <p>
              <i className="fas fa-key" /> Keywords: <i>{article.keyWords}</i>{" "}
            </p>
          </div>
          <div className="flex-container">
            {user?(
              user.id === article.authorId ||
            (user && user.privilege === "admin") ? (
              <React.Fragment>
                <div className={this.state.classNameAdmin}>
                  <Link to={"/add" + article.id}>
                    <i className="fas fa-edit" /> <span> </span>{" "}
                    <i>{strings.strings.common.edit}</i>
                  </Link>
                </div>
                <div
                  className={this.state.classNameAdmin}
                  onClick={() => handleDelete(article)}
                >
                  <i className="far fa-trash-alt" /> <span> </span>{" "}
                  <i>{strings.strings.common.delete}</i>
                </div>
              </React.Fragment>
            ) : null):null}
            <MessagesContainer
              id={article.id}
              viewMessageId={article.id}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Article;
