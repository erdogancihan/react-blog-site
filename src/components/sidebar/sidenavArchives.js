import React from "react";
import { connect } from "react-redux";

import { showArticle } from "../../store/actions/articlesActionCreator";

import SidenavArchivesYears from "./sidenavArchivesYears";
import SidenavArchivesMonths from "./sidenavArchivesMonths";

const SideNavDated = ({ articles, showArticle, strings }) => {
  //articles according to years
  let rows = [];
  let lastYear = [];
  let lastMonth = [];
  let monthsCount = {};

  //shows respecting months' articles
  const handleShowArticle = month => {
    let view = {
      single: "",
      all: false,
      monthly: month,
      category: ""
    };
    showArticle(view);
  };

  //gets the count of articles according to  months
  articles &&
    articles.map(article => {
      let articleDate = new Date(article.date);
      let monthYear = articleDate.getFullYear() + "/" + articleDate.getMonth();
      return (monthsCount[monthYear] = (monthsCount[monthYear] || 0) + 1);
    });
  var countsArray = [];

  for (let [key, value] of Object.entries(monthsCount)) {
    const obj = { [key]: value };
    countsArray.push(obj);
  }

  //puts article years to the list
  articles &&
    articles.map(article => {
      let articleDate = new Date(article.date);
      if (articleDate.getFullYear() !== lastYear) {
        rows.push(
          <SidenavArchivesYears
            year={articleDate.getFullYear()}
            key={articleDate.getFullYear()}
          />
        );
      }

      //puts article months to the list
      if (articleDate.getFullYear() + articleDate.getMonth() !== lastMonth) {
        rows.push(
          <SidenavArchivesMonths
            key={articleDate.getFullYear() + "/" + articleDate.getMonth()}
            month={articleDate.getMonth()}
            year={articleDate.getFullYear()}
            handleShowArticle={handleShowArticle}
            monthsCount={countsArray}
            strings={strings}
          />
        );
      }
      lastYear = articleDate.getFullYear();
      lastMonth = articleDate.getFullYear() + articleDate.getMonth();
    });

  return (
    <div className="sidenav">
      <h4>
        <i className="fas fa-archive" /> <span> </span>{" "}
        {strings.strings.sidebar.archive}
      </h4>
      <table>{rows}</table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.firestore.ordered.articles,
    strings: state.language
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
)(SideNavDated);
