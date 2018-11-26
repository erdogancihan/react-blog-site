import React from "react";

const Category = ({ category, categoryCount, handleShowArticle,handleDropdown }) => {
 
  return (
    <li>
      <div
        className="article-list"
        onClick={() => {
          handleShowArticle(category); handleDropdown()
        }}
      >
        {" "}
        {category + "(" + categoryCount + ")"}
      </div>
    </li>
  );
};

export default Category;
