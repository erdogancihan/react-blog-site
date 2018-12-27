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
    const { firestore, firebase, FirebaseAuth } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(function(user) {
      if (user) {
       // alert(user.uid, user.emailVerified.toString());
        if (auth.uid && auth.emailVerified === true) {
          firestore.get({
            collection: "users",
            doc: auth.uid,
            storeAs: "user"
          });
        }
      }
    });
    //console.log(authListener);

    
  }
  /*
  componentDidUpdate() {
    const { firestore, firebase } = this.context.store;
    const auth = this.props.auth;
    console.log(this.props)
    const props=this.props
    console.log(props)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(props)
        if (!props.user)
          if (auth.emailVerified === true) {
            firestore.get({
              collection: "users",
              doc: auth.uid,
              storeAs: "user"
            });
          }
      } else {
        // No user is signed in.
      }
    });
  }
*/
  render() {
    const { logOut, strings, auth, user } = this.props;
    const LogOut = () => {
      console.log("logout");
      logOut();
    };

    const handleShowArticle = () => {
      let view = {
        single: "",
        all: true,
        monthly: ""
      };
      this.props.showArticle(view);
    };

    const toggleClass = () => {
      const navs = document.querySelectorAll(".navbar-items");
      navs.forEach(nav => nav.classList.toggle("navbar-toggleShow"));
    };

    return (
      <div className="navbar">
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        <div className="nav-link navbar-brand" onClick={handleShowArticle}>
          <Link to="/">FLOPPY HOME</Link>
        </div>
        <div className="nav-link nav-link-toggle" onClick={toggleClass}>
          <i className="fas fa-bars" />
        </div>
        <nav className="navbar-items">
          <div className="nav-link">
            <Link to="/about" onClick={toggleClass}>
              {strings.navbar.about}
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/terms" onClick={toggleClass}>
              {strings.navbar.terms}
            </Link>
          </div>
          <div className="nav-link">
            <CategoriesContainer strings={strings} toggleClass={toggleClass} />
          </div>
        </nav>

        <nav className="navbar-items navbar-items-right">
          <div className="nav-link"> </div>
          {!user ? (
            <LoggedOut strings={strings} toggleClass={toggleClass} />
          ) : user.privilege === "admin" ? (
            <React.Fragment>
              <Admin strings={strings} toggleClass={toggleClass} />
              <LoggedIn
                user={user}
                LogOut={LogOut}
                strings={strings}
                toggleClass={toggleClass}
              />
            </React.Fragment>
          ) : user.privilege === "powerUser" ? (
            <React.Fragment>
              <PowerUser strings={strings} toggleClass={toggleClass} />
              <LoggedIn
                user={user}
                LogOut={LogOut}
                strings={strings}
                toggleClass={toggleClass}
              />
            </React.Fragment>
          ) : (
            <LoggedIn
              user={user}
              LogOut={LogOut}
              strings={strings}
              toggleClass={toggleClass}
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
