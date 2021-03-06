import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import MessagesContainer from "../messages/messagesContainer";

class article extends Component {
  state = {
    togleview: true,
    className: "article-content",
    classNameButton: "readMore",
    classNameAdmin: "hide",
    viewMessageId: ""
  };
  render() {
    const { article, auth, handleDelete, strings } = this.props;

    //expends or collapses the selected article
    const viewContent = id => {
      if (this.state.togleview) {
        this.setState({
          togleview: !this.state.togleview,
          className: "article-content-visible",
          classNameButton: "hide",
          classNameAdmin: "readMore",
          viewMessageId: id
        });
      } else {
        this.setState({
          togleview: !this.state.togleview,
          className: "article-content",
          classNameButton: "readMore",
          classNameAdmin: "hide",
          viewMessageId: ""
        });
      }
    };
    return (
      <article className="article-container">
        <header>
          <div className="article-title">
            <Link to={"/article" + article.id}>
              <h1
                onClick={() => {
                  viewContent(article.id);
                }}
              >
                {article.title}
              </h1>
            </Link>
          </div>
        </header>
        <div className="flex-container">
          <p className="article-author">
            <i className="fas fa-pencil-alt" /> <span> </span> {article.author}{" "}
          </p>
          <p className="article-date">
            <i className="far fa-calendar-alt" />
            <span> </span> {moment(article.date).format("ll")}
          </p>
        </div>

        <div
          className={this.state.className}
          id={`article-content${article.key}`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <p className="keywords">
          <i className="fas fa-key" /> Keywords: <i>{article.keyWords}</i>{" "}
        </p>
        <div className="flex-container">
          <div
            className={this.state.classNameButton}
            onClick={() => {
              viewContent(article.id);
            }}
          >
            <i>{strings.strings.articles.readMore}</i> <span> </span>{" "}
            <i className="fas fa-arrow-right" />
          </div>
          {//if logged in user is admin or author of the article edit and delete buttons are visible
          auth.uid === article.authorId ||
          (auth.isAdmin===true) ? (
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
          ) : null}

          <MessagesContainer
            id={article.id}
            viewMessageId={this.state.viewMessageId}
          />
        </div>
      </article>
    );
  }
}

export default article;
