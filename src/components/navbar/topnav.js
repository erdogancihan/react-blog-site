import React, { Component } from "react";
import { connect } from "react-redux";

import { setLanguage } from "../../store/actions/languagesActionCreator";

export class Topnav extends Component {
  componentDidMount() {
    const lang = localStorage.getItem("language");
    this.props.setLanguage(lang);
  }
  handleSetLang = e => {
    const lang = e.target.id;
    this.props.setLanguage(lang);
  };
  componentDidUpdate() {
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
            {" "}
            tr
          </li>
          <li className="nav-item" id="de" onClick={this.handleSetLang}>
            {" "}
            de
          </li>
          <li className="nav-item" id="en" onClick={this.handleSetLang}>
            {" "}
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
    setLanguage: lang => dispatch(setLanguage(lang))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Topnav);
