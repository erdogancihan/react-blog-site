import React from "react";
import moment from "moment";
import {Link} from "react-router-dom"
import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";

const LastArticle = ({ article,handleShowArticle, strings }) => {
  if (strings.language === "tr") {
    moment.locale("tr");
  } else if (strings.language === "en") {
    moment.locale("en-gb");
  } else if (strings.language === "de") {
    moment.locale("de");
  }
  return (
    <li>
       <Link to={"/article"+article.id}>
      <div className="article-list" onClick={()=>{handleShowArticle(article.id)}}> {article.title} </div>
      <div className="article-list-date"> {moment(article.date).fromNow()}</div>
      </Link>
    </li>
  );
};

export default LastArticle;
