import React from "react";
import { Link } from "react-router-dom";

const PowerUser = ({ strings,toggleClass }) => {
  return (
    <div className="nav-link">
      <Link to="/add" onClick={toggleClass}>
        {strings.navbar.addArticle}
      </Link>
    </div>
  );
};

export default PowerUser;
