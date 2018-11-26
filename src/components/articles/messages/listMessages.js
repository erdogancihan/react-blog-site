import React from "react";
import Message from "./message";
import SendMessage from "./sendMessage";

const ListMessages = ({ messages, articleId, handleDelete, user, strings }) => {
  return (
    <div>
      {messages.messages.map(message => {
        if (message.articleId === articleId.toString()) {
          return (
            <Message
              key={message.id}
              message={message}
              handleDelete={handleDelete}
              user={user}
              strings={strings}
            />
          );
        }
        return null;
      })}

      <SendMessage articleId={articleId} strings={strings} />
    </div>
  );
};

export default ListMessages;
