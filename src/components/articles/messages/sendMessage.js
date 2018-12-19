import React, { Component } from "react";
import { connect } from "react-redux";


import { addMessage } from "../../../store/actions/messagesActionCreator";

export class SendMessage extends Component {
  state = {
    message: {
      articleId: this.props.articleId,
      author: "",
      authorId: "1",
      date: "",
      content: "",
    
    }
  };
  handleChange = e => {
    this.setState({
      message: { ...this.state.message, [e.target.id]: e.target.value }
    });
  };

  //adds message
  handleAddMessage = e => {
    e.preventDefault();
    console.log(this.props.user);
    if (this.props.user.userId !== null) {
      this.props.addMessage(this.state.message);
      this.setState(
        {
          message: { ...this.state.message, content: "" }
        },
        console.log("message sent", this.state)
      );
    }
  };

  render() {
    const { strings } = this.props;
    return (
      <div className="message">
        <form onSubmit={this.handleAddMessage}>
          <h4>
            <i>{strings.messages.writeMessage}</i>
          </h4>
          <textarea
            id="content"
            onChange={this.handleChange}
            value={this.state.message.content}
          />
          <button className="button">{strings.common.send}</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.firestore.data.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessage);
