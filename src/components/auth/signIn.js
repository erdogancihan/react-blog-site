import React from "react";

const SignIn = props => {
  const { onChange, onSubmit, showSignup,strings } = props;
 
  return (
    <React.Fragment>
      <div className="flex-container ">
        <form name="signIn" onSubmit={onSubmit}>
          <h2 className="text-center">{strings.auth.loginToOurblog}</h2>
          <div className="form-group">
            <label className="form-control" htmlFor="InputEmail1">
            {strings.auth.emailAddress}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder={strings.auth.placeHolders.enterEmail}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-Control" htmlFor="InputPassword">
            {strings.auth.password}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder={strings.auth.placeHolders.enterPassword}
              onChange={onChange}
              required
            />
          </div>

          <div className="center">
            <button className="button">{strings.auth.login}</button>
          </div>
        </form>
      </div>
      <div className="center">
      <div className="text-light" id="message" >
      {strings.auth.notMember}
        <span className="toogle" onClick={showSignup}> {strings.auth.signup}</span>
      </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
