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
    const { article, handleDelete, user, strings } = this.props;

 
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
      <div className="article-container">
        <div className="article-title">
          {" "}
          <h2
            onClick={() => {
              viewContent(article.id);
            }}
          >
            {article.title}
          </h2>
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
            <i className="fas fa-key" /> Key Words: <i>{article.keyWords}</i>{" "}
          </p>
        </div>
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
          {user.userId === article.authorId || user.userId === "2" ? (
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
      </div>
    );
  }
}

export default article;