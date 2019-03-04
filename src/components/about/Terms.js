import React, { Component } from "react";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: `loading...`,
      edit: false,
      classNameAdmin: "hide"
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get({
      collection: "terms"
    });
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.terms !== this.props.terms ||
      previousProps.lang !== this.props.lang ||
      previousProps.auth !== this.props.auth
    ) {
      this.props.auth.isAdmin
        ? this.setState({
            classNameAdmin: "readMore"
          })
        : this.setState({
            classNameAdmin: "hide"
          });
      if (this.props.terms && this.props.terms[this.props.lang]) {
        this.setState({ terms: this.props.terms[this.props.lang].terms });
      } else this.setState({ terms: "lütfen veri girişi yapınız." });
    }
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      terms: newContent
    });
    // console.log(evt.editor.getData());
  };

  toggleEdit = () => {
    console.log(this.state);
    if (this.state.edit === true) {
      const { firestore } = this.context.store;
      let data = { terms: this.state.terms };
      firestore
        .set(
          {
            collection: "terms",
            doc: this.props.lang
          },
          data
        )
        .then(resp => {
          return console.log(resp);
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({
      edit: !this.state.edit
    });
  };

  render() {
      return (
      <div className="about-container">
        {this.state.edit === true ? (
          <div>
            <CKEditor
              className="CKeditor"
              content={this.state.terms}
              events={{
                change: this.onChange
              }}
            />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: this.state.terms }} />
        )}
        <div className={this.state.classNameAdmin} onClick={this.toggleEdit}>
          <i className="fas fa-edit" /> <span> </span>{" "}
          {this.state.edit === false ? <i>Düzenle </i> : <i>Kaydet</i>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    terms: state.firestore.data.terms
  };
};
export default connect(mapStateToProps)(Terms);
