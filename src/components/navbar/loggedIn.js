import React from "react";
import { Link } from "react-router-dom";

const LoggedIn = ({ user, LogOut, strings, toggleClass }) => {
  return (
    <React.Fragment>
      <div className="nav-link">
        <Link to="/changepassword" onClick={toggleClass}>
          {" "}
          <i className="far fa-user" />
          <span> </span> {user.userName}
        </Link>
      </div>
      <div className="nav-link">
        <Link
          to="/"
          onClick={() => {
            LogOut();
            toggleClass();
          }}
        >
          <i className="fas fa-sign-out-alt" /> <span> </span>{" "}
          {strings.navbar.logout}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default LoggedIn;
