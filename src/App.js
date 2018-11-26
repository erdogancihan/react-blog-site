import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Topnav from "./components/navbar/topnav";
import Navbar from "./components/navbar/navbar";
import ArticlesContainer from "./components/articles/listArticles/articlesContainer";
import SidebarContainer from "./components/sidebar/sidebarContainer";
import FooterContainer from "./components/footer/footerContainer";
import AddArticle from "./components/articles/addArticles/addArticle";
import Authentication from "./components/auth/authentication";
import About from "./components/about/about"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Topnav/>
            <Navbar />
            <div className="placeholder" />
            <div className="main">
              <div >
                <SidebarContainer />
              </div>
              <div >
              <Switch>
                <Route exact path="/" component={ArticlesContainer} />
                <Route path="/add:id" component={AddArticle} />
                <Route path="/add" component={AddArticle} />
                <Route path="/about" component={About}/>
                <Route path="/signin" component={Authentication}/>
                </Switch>
              </div>
            </div>        
          <FooterContainer />
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
