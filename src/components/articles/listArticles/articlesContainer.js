import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";

import ListArticles from "./listArticles";
import {
  fetchArticles,
  deleteArticle
} from "../../../store/actions/articlesActionCreator";
import { fetchMessages } from "../../../store/actions/messagesActionCreator";

class ArticlesContainer extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    // console.log(this.props.articles)
    if (this.props.articles.articles.length === 0) {
      this.props.fetchArticles();
      this.props.fetchMessages();
    }
    this.setState({
      articles: this.props.articles.articles.slice(0, 5)
    });
  }

  componentDidUpdate(previousProps, previousState) {
    //console.log("pre", previousProps);
    // console.log("after", this.props);
    //shows recent five articles.
    if (previousProps.articles !== this.props.articles) {
      if (this.props.articles.view && this.props.articles.view.all === true) {
        return this.setState({
          articles: this.props.articles.articles.slice(0, 5)
        });
        //shows the selected article from last articleslist
      } else if (this.props.articles.view.single !== "") {
        this.props.articles.articles.map(article => {
          if (article.id === this.props.articles.view.single) {
            return this.setState({
              articles: [article]
            });
          }
          return null;
        });
        //shows articles according to months
      } else if (this.props.articles.view.monthly !== "") {
        let articlesFiltered = [];
        this.props.articles.articles.map(article => {
          let y = new Date(article.date).getFullYear();
          let m = new Date(article.date).getMonth();
          let date = y + "/" + m;
          if (date === this.props.articles.view.monthly) {
            return articlesFiltered.push(article);
          }
          return null;
        });

        this.setState({
          articles: articlesFiltered
        });
        //shows articles accorting to its category
      } else if (this.props.articles.view.category !== "") {
        let articlesFiltered = [];
        this.props.articles.articles.map(article => {
          if (article.category === this.props.articles.view.category) {
            return articlesFiltered.push(article);
          }
          return null;
        });

        this.setState({
          articles: articlesFiltered
        });
      }
    }
    
  }

  //deletes article
  handleDelete = article => {
    console.log("delete", article);
    this.props.deleteArticle(article);
  };

  render() {
    const { articles, user, strings } = this.props;
    
    if (strings.language === "tr") {
      moment.locale("tr");
    } else if (strings.language === "en") {
      moment.locale("en-gb");
    } else if (strings.language === "de") {
      moment.locale("de");
    }
    if (articles.loading === true) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="articles-container">
          <ListArticles
            articles={this.state.articles}
            handleDelete={this.handleDelete}
            user={user}
            strings={strings}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
 
  return {
    articles: state.articles,
    messages: state.messages,
    user: state.users.user,
    strings: state.language
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles()),
    deleteArticle: article => dispatch(deleteArticle(article)),
    fetchMessages: () => dispatch(fetchMessages())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);
