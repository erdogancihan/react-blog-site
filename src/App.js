import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Topnav from "./components/navbar/topnav";
import Navbar from "./components/navbar/navbar";
import ArticlesContainer from "./components/articles/listArticles/articlesContainer";
import ArticleContainer from "./components/articles/singleArticle/articleContainer";
import SidebarContainer from "./components/sidebar/sidebarContainer";
import FooterContainer from "./components/footer/footerContainer";
import AddArticle from "./components/articles/addArticles/addArticle";
import Authentication from "./components/auth/authentication";
import About from "./components/about/about";
import Users from "./components/auth/users";
import ChangePassword from "./components/userAdmin/authentication";
import Terms from "./components/about/Terms";

class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Helmet>
            <meta charset="utf-8" />
            <title>MEDICAL STATISTICS</title>
            <meta name="description" content="Medical statistics." />
            <link rel="canonical" href="" />
          </Helmet>
          <Topnav />
          <Navbar />

          <section className="main">
          
            <SidebarContainer/>
           
            <main>
              <Switch>
                <Route exact path="/" component={ArticlesContainer} />
                <Route path="/add:id" component={AddArticle} />
                <Route path="/article:id" component={ArticleContainer} />
                <Route path="/add" component={AddArticle} />
                <Route path="/about" component={About} />
                <Route path="/terms" component={Terms} />
                <Route path="/signin" component={Authentication} />
                <Route path="/users" component={Users} />
                <Route path="/changepassword" component={ChangePassword} />
               
              </Switch>
            </main>
          </section>
          <FooterContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
