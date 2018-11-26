import React from "react";

const Category = ({ category, categoryCount, handleShowArticle }) => {
 
  return (
    <li>
      <div
        className="archive-list"
        onClick={() => {
          handleShowArticle(category)
        }}
      >
        {" "}
        {category + "(" + categoryCount + ")"}
      </div>
    </li>
  );
};

export default Category;
