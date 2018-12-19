import React, { Component } from "react";

import LastArticles from "../sidebar/lastArticles";
import CategoriesContainer from "../sidebar/categoriesContainer";
import SidenavArchives from "../sidebar/sidenavArchives";
import Contact from "./contact";

export class FooterContainer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-container">
          <LastArticles />
          <SidenavArchives />
          <CategoriesContainer />
        </div>
        <Contact />
      </div>
    );
  }
}

export default FooterContainer;
