import React from "react";
import { Link } from "react-router-dom";

const Admin = ({ strings , toggleClass}) => {
  return (
    <React.Fragment>
      <div className="nav-link" onClick={toggleClass}>
        <Link to="/add">
          <i className="fas fa-plus"> </i> <span> </span>
          {strings.navbar.addArticle}
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/users" onClick={toggleClass}>Users</Link>
      </div>
    </React.Fragment>
  );
};

export default Admin;
