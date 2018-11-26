import React, { Component } from "react";
import { connect } from "react-redux";
import Category from "./category";
import { showArticle } from "../../store/actions/articlesActionCreator";

class CategoriesContainer extends Component {
  state = {
    toggleDrop: 0
  };
  render() {
    const { articles, showArticle,strings } = this.props;
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
    //Handles dopdown Menu
    const dropdownContent = document.getElementById("dropdownContent");
    const handleDropdown = () => {
     
            if (this.state.toggleDrop === 0) {
        this.setState(
          {
            ...this.state,
            toggleDrop: 1
          },
          dropdownContent.setAttribute("class", "drop dropdown-content")
        );
      } else {
        this.setState(
          {
            ...this.state,
            toggleDrop: 0
          },
          dropdownContent.setAttribute("class", "dropdown-content")
        );
      }
    };

    const collapse=()=>{
      this.setState(
        {
          ...this.state,
          toggleDrop: 0
        },
        dropdownContent.setAttribute("class", "dropdown-content")
      );
    }

    //gets the count of articles according to  category
    articles.map(article => {
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
          handleDropdown={handleDropdown}
          categoryCount={Object.values(category)[0]}
        />
      );
    });

    return (
      <div className="nav-link dropdown"  tabIndex="0" onBlur={collapse}>
        <h4 onClick={handleDropdown}>{strings.navbar.categories} <i className="fas fa-sort-down"></i></h4>
        <div className="dropdown-content" id="dropdownContent">
          <ul className="category">{rows}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles
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
