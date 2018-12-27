import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category, categoryCount, handleShowArticle }) => {
  return (
    <li>
      <div
        className="article-list"
        onClick={() => {
          handleShowArticle(category);
        }}
      >
        <Link to="/"> {category + "(" + categoryCount + ")"}</Link>
      </div>
    </li>
  );
};

export default Category;
