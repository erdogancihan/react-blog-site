import React from "react";
import {Link} from "react-router-dom"

const Admin = ({strings}) => {
  return (
    <div className="nav-link">
      <Link to="/add"><i className="fas fa-plus"> </i> <span> </span>{strings.navbar.addArticle}</Link>
    </div>
  );
};

export default Admin;
