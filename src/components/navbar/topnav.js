import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  setLanguage,
  getLanguage
} from "../../store/actions/languagesActionCreator";
import { showArticle } from "../../store/actions/articlesActionCreator";

export class Topnav extends Component {
  componentDidMount() {
    //gets the language from the local stroge.
    const lang = localStorage.getItem("language");
    //dispatches action to change the language from the reducer.
    this.props.setLanguage(lang);
    this.props.getLanguage();
  }

  //dispatches an action to change the language.
  handleSetLang = e => {
    const lang = e.target.id;
    let view = {
      single: "",
      all: true,
      monthly: "",
      category: ""
    };
    this.props.setLanguage(lang);
    //views all articles by that language.
    this.props.showArticle(view);
  };
  componentDidUpdate() {
    //changes the class of the selected item
    let active = this.props.language.language;
    switch (active) {
      case "tr":
        document.getElementById("tr").className = "nav-item active-lang";
        document.getElementById("de").className = "nav-item ";
        return (document.getElementById("en").className = "nav-item ");
      case "de":
        document.getElementById("tr").className = "nav-item ";
        document.getElementById("de").className = "nav-item active-lang";
        return (document.getElementById("en").className = "nav-item ");
      case "en":
        document.getElementById("tr").className = "nav-item ";
        document.getElementById("de").className = "nav-item ";
        return (document.getElementById("en").className =
          "nav-item active-lang ");
      default:
        document.getElementById("tr").className = "nav-item ";
        document.getElementById("de").className = "nav-item ";
        return (document.getElementById("en").className = "nav-item ");
    }
  }
  render() {
    return (
      <div className="topnav">
        <ul className="nav" id="languageUl">
          <li className="nav-item" id="tr" onClick={this.handleSetLang}>
            tr
          </li>

          <li className="nav-item" id="de" onClick={this.handleSetLang}>
            de
          </li>

          <li className="nav-item" id="en" onClick={this.handleSetLang}>
            en
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    language: state.language
  };
};
const mapDispatchToprops = dispatch => {
  return {
    setLanguage: lang => dispatch(setLanguage(lang)),
    getLanguage: () => dispatch(getLanguage()),
    showArticle: view => dispatch(showArticle(view))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Topnav);
