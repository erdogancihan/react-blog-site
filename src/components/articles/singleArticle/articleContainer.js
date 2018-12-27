import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";

import Article from "./article";
import { deleteArticle } from "../../../store/actions/articlesActionCreator";

class ArticleContainer extends Component {
 
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get({
      collection: "articles",
      doc: this.props.match.params.id,
      storeAs: "article"
    });
  }


  //deletes article
  handleDelete = article => {
    console.log("delete", article);
    this.props.deleteArticle(article);
  };

  render() {
    console.log(this.props)
    //it sets moment locale according to the selected language.
    const { article, user, strings } = this.props;
    if (strings.language === "tr") {
      moment.locale("tr");
    } else if (strings.language === "en") {
      moment.locale("en-gb");
    } else if (strings.language === "de") {
      moment.locale("de");
    }
    if (!article) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="articles-container">
          <Article
            article={article[0]}
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
    article: state.firestore.ordered.article,
    messages: state.firestore.ordered.messages,
    user: state.firestore.data.user,
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
  firestoreConnect([
   ])
)(ArticleContainer);
