import React, { Component } from "react";

function authenticate(WrappedComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.onInputChange = this.onInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(e) {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      this.setState({ [inputName]: inputValue });
    }
    onSubmit(e) {
      e.preventDefault();
      if (e.target.name === "signUp") {
        if (this.state.password !== this.state.password1) {
          alert("Şifreler Eşleşmiyor. Lütfen Tekrar deneyiniz.");
        } else {
          this.props.onSubmit(this.state);
        }
      }else{
        this.props.onSubmit(this.state);
        
      }
      
    }

    render() {
      const { onSubmit, ...otherProps } = this.props;
      return (
        <WrappedComponent
          onChange={this.onInputChange}
          onSubmit={this.onSubmit}
          {...otherProps}
        />
      );
    }
  }
  return Authenticate;
}
export default authenticate;
