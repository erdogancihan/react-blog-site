import React, { Component } from "react";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";

import {
  addArticle,
  editArticle
} from "../../../store/actions/articlesActionCreator";

class AddArticle extends Component {
  state = {
    article: {
      id: null,
      title: "",
      content: "",
      author: "Erd",
      authorId: "1",
      date: "",
      keyWords: "",
      category:""
    }
  };

  componentDidMount() {
    if (this.state.article.id === null) {
      this.setStateWithProps();
    }
  }
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      article: { ...this.state.article, content: newContent }
    });
    // console.log(evt.editor.getData());
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      article: { ...this.state.article, [e.target.id]: e.target.value }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (!this.props.match.params.id) {
      this.props.addArticle(this.state.article);
    } else {
      this.props.editArticle(this.state.article);
    }
    console.log(this.props);
    if (this.props.articles.error === null) {
      this.props.history.push("/");
    } else {
      alert("Hata Oluştu", this.props.articles.error);
    }
  };

  setStateWithProps = () => {
    const id = this.props.match.params.id;

    this.props.articles.articles &&
      this.props.articles.articles.filter(article => {
 
        if (article.id.toString() === id) {
          console.log("aranan", article);
          return this.setState({
            article: article
          });
        } return null;
      });
  };

  render() {
    const {strings}=this.props;
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
            id="lang"
            value={this.state.article.lang}
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
  return {
    articles: state.articles,
    strings:state.language.strings
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddArticle);
