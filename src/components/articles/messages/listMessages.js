import React from "react";
import Message from "./message";
import SendMessage from "./sendMessage";

const ListMessages = ({ messages,auth, articleId, handleDelete, user, strings }) => {
  //console.log(user)
  return (
    <div>
      {//shows messages according to correspanding article.
     messages && messages.map(message => {
        if (message.articleId === articleId.toString()) {
          return (
            <Message
              key={message.id}
              message={message}
              handleDelete={handleDelete}
              user={user}
              auth={auth}
              strings={strings}
            />
          );
        }
        return null;
      })}
      {//if user is not logged in send message component is unvisible.
      auth.uid ? (
        <SendMessage articleId={articleId} strings={strings} />
      ) : null}
    </div>
  );
};

export default ListMessages;
