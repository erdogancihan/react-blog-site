import React from "react";


const Category = ({
  category,
  categoryCount,
  handleShowArticle,
  handleDropdown,
  toggleClass
}) => {
  return (
    <li>
      <div
        className="article-list"
        onClick={() => {
          handleShowArticle(category);
          handleDropdown();
          toggleClass();
        }}
      >
        {category + "(" + categoryCount + ")"}
      </div>
    </li>
  );
};

export default Category;
