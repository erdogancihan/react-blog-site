import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Message = ({ message, auth, handleDelete, strings }) => {
  return (
    <div className="message">
      <p className="message-content">{message.content}</p>
      <p className="text-right">
        <i>
          {message.author}{" "}
          <span className="text-light">{moment(message.date).fromNow()}</span>{" "}
        </i>
      </p>
      {//if logged in user is admin or author of the message delete button is visible
      auth.uid == message.authorId || (auth.isAdmin === true) ? (
        <div className="user-only" onClick={() => handleDelete(message)}>
          <div className="delete-button">
          <i className="far fa-trash-alt" />  <i>{strings.common.delete}</i>{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};
Message.propTypes = {
  userId: PropTypes.string,
  authorId: PropTypes.string
};
export default Message;
