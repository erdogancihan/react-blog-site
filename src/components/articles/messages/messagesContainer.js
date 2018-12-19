import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PropTypes from "prop-types";

import { deleteMessage } from "../../../store/actions/messagesActionCreator";
import ListMessages from "./listMessages";

export class messagesContainer extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
      firestore.get({
      collection: "messages",
      });
  }


  //dispatches delete action to the reducer.
  handleDelete = message => {
    this.props.deleteMessage(message);
  };

  render() {
    const { strings, viewMessageId, messages, user, auth } = this.props;
    let messageClass = "messages-container-hide";
    //shows the messages for expanded article only
    if (this.props.id === viewMessageId) {
      messageClass = "messages-container";
    }

    return (
      <div className={messageClass} id={"message" + this.props.id}>
        <h4>{strings.messages.messages}</h4>
        <ListMessages
          messages={messages}
          articleId={this.props.id}
          handleDelete={this.handleDelete}
          user={user}
          auth={auth}
          strings={strings}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
   return {
    messages: state.firestore.ordered.messages,
    user: state.firestore.data.user,
    strings: state.language.strings,
    auth:state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: message => dispatch(deleteMessage(message))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "messages" }])
)(messagesContainer);
