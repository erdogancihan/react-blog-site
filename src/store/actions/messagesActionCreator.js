export function addMessage(message) {
  message.date = new Date().toISOString();
  console.log(message);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const language = getState().language.language;
    const author = getState().firestore.data.user.userName;
    const authorId = getState().firebase.auth.uid;
    const newMessage = { ...message, author, authorId, language };

    const firestore = getFirestore();
    firestore
      .collection("messages")
      .add(
        newMessage
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function editMessage(message) {
  console.log(message.id);
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();

    fireStore
      .update({ collection: "messages", doc: message.id }, message)
      .then(resp => {
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteMessage(message) {
  console.log(message.id);

  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .delete({ collection: "messages", doc: message.id })
      .then(resp => {
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchMessages() {
  return (dispatch, getState, { getFirestore }) => {
    const language = getState().language.language;
    const fireStore = getFirestore();
    fireStore
      .onSnapshot({
        collection: "messages",
        where: ["lang", "==", language],
        orderBy: ["date"]
      })
      .then(response => {
        return console.log(response);
      })
      .catch(error => {
        return console.log(error);
      });
  };
}
