import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CookieConsent from "react-cookie-consent";
import PropTypes from "prop-types";

import { showArticle } from "../../store/actions/articlesActionCreator";
import { logOut } from "../../store/actions/usersActionCreator";
import CategoriesContainer from "./categoriesContainer";
import LoggedIn from "./loggedIn";
import Admin from "./admin";
import PowerUser from "./powerUser";
import LoggedOut from "./loggedOut";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore, firebase } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          auth.isPowerUser = idTokenResult.claims.powerUser;
          auth.isAdmin = idTokenResult.claims.admin;
        });
        if (auth.uid && auth.emailVerified === true) {
          firestore.onSnapshot({
            collection: "users",
            doc: auth.uid,
            storeAs: "user"
          });
        }
      }
    });
  }

  componentDidUpdate() {
    const { firebase } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          auth.isPowerUser = idTokenResult.claims.powerUser;
          auth.isAdmin = idTokenResult.claims.admin;
        });
      }
    });
  }

  LogOut = () => {
    console.log("logout");
    this.props.logOut();
  };

  handleShowArticle = () => {
    let view = {
      single: "",
      all: true,
      monthly: ""
    };
    this.props.showArticle(view);
  };

  toggleClass = () => {
    const navs = document.querySelectorAll(".navbar-items");
    navs.forEach(nav => nav.classList.toggle("navbar-toggleShow"));
  };

  render() {
    const { strings, user, auth } = this.props;
    return (
      <div className="navbar">
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>

        <div className="nav-link navbar-brand" onClick={this.handleShowArticle}>
          <Link to="/">MEDICAL STATISTICS</Link>
        </div>
        <div className="nav-link nav-link-toggle" onClick={this.toggleClass}>
          <i className="fas fa-bars" />
        </div>
        <nav className="navbar-items">
          <div className="nav-link">
            <Link to="/about" onClick={this.toggleClass}>
              {strings.navbar.about}
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/terms" onClick={this.toggleClass}>
              {strings.navbar.terms}
            </Link>
          </div>
          <div className="nav-link">
            <CategoriesContainer
              strings={strings}
              toggleClass={this.toggleClass}
            />
          </div>
        </nav>

        <nav className="navbar-items navbar-items-right">
          <div className="nav-link"> </div>
          {!user ? (
            <LoggedOut strings={strings} toggleClass={this.toggleClass} />
          ) : auth.isAdmin === true ? (
            <React.Fragment>
              <Admin strings={strings} toggleClass={this.toggleClass} />
              <LoggedIn
                user={user}
                LogOut={this.LogOut}
                strings={strings}
                toggleClass={this.toggleClass}
              />
            </React.Fragment>
          ) : auth.isPowerUser === true ? (
            <React.Fragment>
              <PowerUser strings={strings} toggleClass={this.toggleClass} />
              <LoggedIn
                user={user}
                LogOut={this.LogOut}
                strings={strings}
                toggleClass={this.toggleClass}
              />
            </React.Fragment>
          ) : (
            <LoggedIn
              user={user}
              LogOut={this.LogOut}
              strings={strings}
              toggleClass={this.toggleClass}
            />
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.language,
    user: state.firestore.data.user,
    strings: state.language.strings,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showArticle: id => dispatch(showArticle(id)),
    logOut: () => dispatch(logOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(Navbar);
