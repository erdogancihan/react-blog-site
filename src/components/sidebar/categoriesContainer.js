import React, { Component } from "react";
import { connect } from "react-redux";
import Category from "./category";
import { showArticle } from "../../store/actions/articlesActionCreator";

class CategoriesContainer extends Component {
  render() {
    const { articles, showArticle, strings } = this.props;
    let rows = [];
    let categoryCount = {};

    //shows respecting months' articles
    const handleShowArticle = category => {
      let view = {
        single: "",
        all: false,
        monthly: "",
        category: category
      };
      showArticle(view);
    };

    //gets the count of articles according to  category
    articles&&articles.map(article => {
      return (categoryCount[article.category] =
        (categoryCount[article.category] || 0) + 1);
    });
    var countsArray = [];

    for (let [key, value] of Object.entries(categoryCount)) {
      const obj = { [key]: value };
      countsArray.push(obj);
    }

    //puts article categories to the list
    countsArray.map(category => {
      rows.push(
        <Category
          category={Object.keys(category)[0]}
          key={Object.keys(category)[0]}
          handleShowArticle={handleShowArticle}
          categoryCount={Object.values(category)[0]}
        />
      );
      return null;
    });

    return (
      <div className="sidenav">
        <div className="nav-link dropdown">
          <h4 className="sidenav-header">
            <i className="fas fa-list-ul" /> <span> </span>{" "}
            {strings.sidebar.categories}
          </h4>
          <div className="dropdown-content-side" id="dropdownContent">
            <ul className="category-side">{rows}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.firestore.ordered.articles,
    strings: state.language.strings
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
)(CategoriesContainer);
