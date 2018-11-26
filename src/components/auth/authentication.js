import React, { Component } from "react";
import { connect } from "react-redux";
import SignIn from "./signIn";
import SignUp from "./signUp";
import authenticate from "./authenticate";
import { signInUser, signUpUser } from "../../store/actions/usersActionCreator";
import { Redirect } from "react-router-dom";

const SignUpForm = authenticate(SignUp);
const SignInForm = authenticate(SignIn);

export class authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccess: true
    };
    this.toggleForm = this.toggleForm.bind(this);
  }
  toggleForm = () => {
    console.log(this.state);
    this.setState({
      userAccess: !this.state.userAccess
    });
  };

  render() {
    const { signInUser, signUpUser, strings } = this.props;
    return (
      <div>
        {this.props.user.user.id !== null ? (
          <Redirect to="/" />
        ) : this.state.userAccess ? (
          <SignInForm onSubmit={signInUser} showSignup={this.toggleForm} strings={strings} />
        ) : (
          <SignUpForm onSubmit={signUpUser} showSignin={this.toggleForm} strings={strings} />
        )}
      </div>
    );
  }
}
const mapStateToprops = state => {
  return {
    user: state.users,
    strings:state.language.strings
  };
};

export default connect(
  mapStateToprops,
  { signUpUser, signInUser }
)(authentication);
