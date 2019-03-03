import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PropTypes from "prop-types";
import CKEditor from "react-ckeditor-component";

import {
  addArticle,
  editArticle
} from "../../../store/actions/articlesActionCreator";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        title: "",
        content: "",
        author: "",
        authorId: "",
        date: "",
        keyWords: "",
        category: ""
      }
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.onSnapshot({
      collection: "articles",
      doc: this.props.match.params.id,
      storeAs: "article"
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.article !== this.props.article) {
      if (this.props.match.params.id) {
        if (this.state.article.title === null) {
          this.setStateWithProps();
        }
      }
    }
  }
  //handles changes on CKEditor for article content
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      article: { ...this.state.article, content: newContent }
    });
    // console.log(evt.editor.getData());
  };

  //handles changes on other data of article
  handleChange = e => {
    this.setState({
      ...this.state,
      article: { ...this.state.article, [e.target.id]: e.target.value }
    });
  };

  //handles submit on new or edited article
  handleSubmit = e => {
    e.preventDefault();
    //if it is a new article dispatches addArticle
    if (!this.props.match.params.id) {
      this.props.addArticle(this.state.article);
      //if it is a edited article dispatches editarticle
    } else {
      this.props.editArticle(this.state.article);
    }
    //if there is an error alerts and pushes to main page
    console.log(this.props);
    //if (this.props.articles.error === null) {
    this.props.history.push("/");
    //  } else {
    //  alert("Hata Oluştu", this.props.articles.error);
    // }
  };

  //if there is an article for edit setState with that article
  setStateWithProps = () => {
    console.log(this.props);
    return this.props.article
      ? this.setState({
          article: this.props.article[0]
        })
      : null;
  };

  render() {
    const { strings } = this.props;
    return (
      <div className="addArticle">
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center">{strings.addArticle.addOrEditArticle}</h3>
          <label htmlFor="title">{strings.addArticle.title}</label>
          <input
            type="text"
            id="title"
            value={this.state.article.title}
            onChange={this.handleChange}
          />
          <label htmlFor="description">{strings.addArticle.description}</label>

          <textarea
            id="description"
            value={this.state.article.description}
            onChange={this.handleChange}
          />
          <label htmlFor="category">{strings.addArticle.category}</label>
          <input
            type="text"
            id="category"
            value={this.state.article.category}
            onChange={this.handleChange}
          />
          <label htmlFor="keyWords">{strings.addArticle.keyWords}</label>
          <input
            type="text"
            id="keyWords"
            value={this.state.article.keyWords}
            onChange={this.handleChange}
          />
          <label htmlFor="language">{strings.addArticle.language}</label>
          <select
            id="language"
            value={this.state.article.language}
            onChange={this.handleChange}
          >
            <option>{strings.addArticle.select}</option>
            <option>en</option>
            <option>de</option>
            <option>tr</option>
          </select>
          <CKEditor
            className="CKeditor"
            content={this.state.article.content}
            events={{
              change: this.onChange
            }}
          />
          <button className="button">{strings.common.save}</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    article: state.firestore.ordered.article,
    strings: state.language.strings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => {
      dispatch(addArticle(article));
    },
    editArticle: article => {
      dispatch(editArticle(article));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([])
)(AddArticle);
