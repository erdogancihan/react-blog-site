import React, { Component } from "react";

import LastArticles from "./lastArticles";
import SidenavArchives from "./sidenavArchives"
import CategoriesContainer from "./categoriesContainer";

export class sidebarContainer extends Component {
  render() {
    return (
      <aside className="sidebar-container"id ="sidebar-container">
        <div className="sidebar">
        <CategoriesContainer/>
          <LastArticles />         
          <SidenavArchives/>
        </div>
      </aside>
    );
  }
}



export default sidebarContainer;
