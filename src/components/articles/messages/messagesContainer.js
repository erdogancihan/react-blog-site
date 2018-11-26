import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMessage } from "../../../store/actions/messagesActionCreator";

import ListMessages from "./listMessages";

export class messagesContainer extends Component {
  handleDelete = message => {
    this.props.deleteMessage(message);
  };

  render() {
    const{strings, viewMessageId, messages,user}=this.props;
    let messageClass = "messages-container-hide";
    if (this.props.id === viewMessageId) {
      messageClass = "messages-container";
    }
    return (
      <div className={messageClass} id={"message" + this.props.id}>
        <h4 >{strings.messages.messages}</h4>
        <ListMessages
          messages={messages}
          articleId={this.props.id}
          handleDelete={this.handleDelete}
          user={user}
          strings={strings}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //   console.log(state)
  return {
    messages: state.messages,
    user:state.users.user,
    strings:state.language.strings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: message=> dispatch(deleteMessage(message))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(messagesContainer);
