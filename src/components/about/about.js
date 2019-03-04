import React, { Component } from "react";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: `loading...`,
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
      collection: "about"
    });
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.about !== this.props.about ||
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
      if (this.props.about && this.props.about[this.props.lang]) {
        this.setState({ about: this.props.about[this.props.lang].about });
      } else this.setState({ about: "lütfen veri girişi yapınız." });
    }
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      about: newContent
    });
    // console.log(evt.editor.getData());
  };

  toggleEdit = () => {
    console.log(this.state);
    if (this.state.edit === true) {
      const { firestore } = this.context.store;
      let data = { about: this.state.about };
      firestore
        .set(
          {
            collection: "about",
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
              content={this.state.about}
              events={{
                change: this.onChange
              }}
            />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: this.state.about }} />
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
    about: state.firestore.data.about
  };
};
export default connect(mapStateToProps)(About);
