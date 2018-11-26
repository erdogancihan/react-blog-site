import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showArticle } from "../../store/actions/articlesActionCreator";
import { setToken, logOut } from "../../store/actions/usersActionCreator";
import CategoriesContainer from "./categoriesContainer";
import LoggedIn from "./loggedIn";
import Admin from "./admin";
import LoggedOut from "./loggedOut";

export class Navbar extends Component {
  state = {};
  componentDidMount() {
    //console.log(this.props.user);
    if (!this.props.user.user.id) {
      this.props.setToken();
    }
  }

  render() {
   const {logOut,strings}=this.props;
    const LogOut = () => {
      console.log("logout");
      this.props.logOut();
    };
    const handleShowArticle = () => {
      let view = {
        single: "",
        all: true,
        monthly: ""
      };
      this.props.showArticle(view);
    };
const toggleClass=()=>{
  const navs = document.querySelectorAll('.navbar-items');
  navs.forEach(nav => nav.classList.toggle('navbar-toggleShow'));
}
    return (
      <div className="navbar">
        <div className="nav-link navbar-brand" onClick={handleShowArticle}>
          <Link to="/">My Blog Site</Link>
        </div>
        <div className="nav-link nav-link-toggle" onClick={toggleClass}>
      <i className="fas fa-bars"></i>
    </div>
        <nav className="navbar-items">
          <div className="nav-link">
            <Link to="/about">{strings.navbar.about}</Link>
          </div>
        </nav>

        <nav className="navbar-items navbar-items-right">
          <div className="nav-link">
            {" "}
            <CategoriesContainer strings={strings} />
          </div>
          {!this.props.user.user.id ? (
            <LoggedOut strings={strings}/>
          ) : this.props.user.user.userId == "2" ? (
            <React.Fragment>
              <Admin strings={strings}/>
              <LoggedIn user={this.props.user.user} LogOut={LogOut}strings={strings} />
            </React.Fragment>
          ) : (
            <LoggedIn user={this.props.user.user} LogOut={LogOut}strings={strings} />
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //  console.log(state);
  return {
    user: state.users,
    strings:state.language.strings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showArticle: id => dispatch(showArticle(id)),
    setToken: () => dispatch(setToken()),
    logOut: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
