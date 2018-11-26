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
      category:""
    };
    showArticle(view);
  };

  //gets the count of articles according to  months
  articles.map(article => {
    article.date = new Date(article.date);
    let monthYear = article.date.getFullYear() + "/" + article.date.getMonth();
    return (monthsCount[monthYear] = (monthsCount[monthYear] || 0) + 1);
  });
  var countsArray = [];

  for (let [key, value] of Object.entries(monthsCount)) {
    const obj = { [key]: value };
    countsArray.push(obj);
  }

  //puts article years to the list
  articles.map(article => {
    article.date = new Date(article.date);
    if (article.date.getFullYear() !== lastYear) {
   rows.push(
        <SidenavArchivesYears
          year={article.date.getFullYear()}
          key={article.date.getFullYear()}
        />
      );
    }

    //puts article months to the list
    if (article.date.getFullYear() + article.date.getMonth() !== lastMonth) {
      rows.push(
        <SidenavArchivesMonths
          key={article.date.getFullYear() + "/" + article.date.getMonth()}
          month={article.date.getMonth()}
          year={article.date.getFullYear()}
          handleShowArticle={handleShowArticle}
          monthsCount={countsArray}
          strings={strings}
        />
      );
    } 
    lastYear = article.date.getFullYear();
    lastMonth = article.date.getFullYear() + article.date.getMonth();
  });

  return (
    <div className="sidenav">
      <h4>
        <i className="fas fa-archive" /> <span> </span> {strings.strings.sidebar.archive}
      </h4>
      <table>{rows}</table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articles.articles,
    strings:state.language
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
