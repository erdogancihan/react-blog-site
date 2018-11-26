import React from "react";
import moment from "moment";
import PropTypes from 'prop-types';

const Message = ({ message, handleDelete, user,strings }) => {
  return (
    <div className="message">
      <div className="message-content">{message.content}</div>
      <p className="text-right">
        <i>
          {message.author}{" "}
          <span className="text-light">{moment(message.date).fromNow()}</span>{" "}
        </i>
      </p>
      {user.userId === message.authorId || user.userId === 2 ? (
        <div className="user-only" onClick={() => handleDelete(message)}>
          <div className="delete-button">
            <i>{strings.common.delete}</i>{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};
Message.propTypes={
 userId:PropTypes.string,
 authorId :PropTypes.string

}
export default Message;
