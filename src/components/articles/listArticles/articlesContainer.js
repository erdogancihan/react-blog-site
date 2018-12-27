import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { actionTypes } from "redux-firestore";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";

import ListArticles from "./listArticles";
import { deleteArticle } from "../../../store/actions/articlesActionCreator";

class ArticlesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore} = this.context.store;
   // console.log(this.props.language)
    firestore.get({
      collection: "articles",
      where: ["language", "==", this.props.language],
      orderBy: ["date", "desc"]
    });
    //it sets first five articles to the state
   // console.log(this.props.articles);
    if (this.props.articles) {
      if (this.props.view.all === true) {
        return this.setState({
          articles: this.props.articles.slice(5)
        });
        //shows the selected article from last articleslist
      } else if (this.props.view.single !== "") {
        console.log("viewcı", this.props.view);
        this.props.articles.map(article => {
          if (article.id === this.props.view.single) {
            return this.setState({
              articles: [article]
            });
          }
          return null;
        });
        //shows articles according to months
      } else if (this.props.view.monthly !== "") {
        let articlesFiltered = [];
        this.props.articles.map(article => {
          let y = new Date(article.date).getFullYear();
          let m = new Date(article.date).getMonth();
          let date = y + "/" + m;
          if (date === this.props.view.monthly) {
            return articlesFiltered.push(article);
          }
          return null;
        });

        this.setState({
          articles: articlesFiltered
        });
        //shows articles according to its category
      } else if (this.props.view.category !== "") {
        let articlesFiltered = [];
        this.props.articles.map(article => {
          if (article.category === this.props.view.category) {
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

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.language !== this.props.language) {
      //console.log(this.props.language)
      const { firestore } = this.context.store;
      firestore.get({
        collection: "articles",
        where: ["language", "==", this.props.language],
        orderBy: ["date", "desc"]
      });

      this.setState({
        articles: this.props.articles
      });
    }
    //console.log("pre", previousProps);
    // console.log("after", this.props.view.category);
    //shows recent five articles.
    if (
      previousProps.articles !== this.props.articles ||
      previousProps.view !== this.props.view
    ) {
      if (this.props.view.all === true) {
        return this.setState({
          articles: this.props.articles
        });
        //shows the selected article from last articleslist
      } else if (this.props.view.single !== "") {
        console.log("viewcı", this.props.view);
        this.props.articles.map(article => {
          if (article.id === this.props.view.single) {
            return this.setState({
              articles: [article]
            });
          }
          return null;
        });
        //shows articles according to months
      } else if (this.props.view.monthly !== "") {
        let articlesFiltered = [];
        this.props.articles.map(article => {
          let y = new Date(article.date).getFullYear();
          let m = new Date(article.date).getMonth();
          let date = y + "/" + m;
          if (date === this.props.view.monthly) {
            return articlesFiltered.push(article);
          }
          return null;
        });

        this.setState({
          articles: articlesFiltered
        });
        //shows articles according to its category
      } else if (this.props.view.category !== "") {
        let articlesFiltered = [];
        this.props.articles.map(article => {
          if (article.category === this.props.view.category) {
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
    const { articles, user, strings,auth } = this.props;
    //it sets moment locale according to the selected language.
    if (strings.language === "tr") {
      moment.locale("tr");
    } else if (strings.language === "en") {
      moment.locale("en-gb");
    } else if (strings.language === "de") {
      moment.locale("de");
    }
    if (!articles) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="articles-container">
          <ListArticles
            articles={this.state.articles}
            handleDelete={this.handleDelete}
            user={user}
            auth={auth}
            strings={strings}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  //console.log(state)
  return {
    language: state.language.language,
    articles: state.firestore.ordered.articles,
    messages: state.firestore.ordered.messages,
    user: state.firestore.data.user,
    view: state.views.view,
    auth:state.firebase.auth,
    strings: state.language
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: article => dispatch(deleteArticle(article))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([])
)(ArticlesContainer);
