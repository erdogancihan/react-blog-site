import React, { Component } from "react";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: ` <h2>About Me</h2>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias officiis recusandae fugiat tempore, magni praesentium abreiciendis eos iure. Odit ex eligendi soluta recusandae adipisci molestias veritatis cum placeat dolore.</p>`,
      edit: false,
      classNameAdmin: "hide"
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.onSnapshot({
      collection: "about",
      doc: this.props.lang
    });
    this.props.auth.isAdmin === true
      ? this.setState({
          classNameAdmin: "hide"
        })
      : this.setState({
          classNameAdmin: "readMore"
        });
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      about: { ...this.state.about, content: newContent }
    });
    // console.log(evt.editor.getData());
  };

  toggleEdit = () => {
    this.setState({
      edit: true
    });
  };
  render() {
    const { lang } = this.props;
    return (
      <div className="about-container">
        {lang === "en" ? (
          this.state.edit === true ? (
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
            <div>
              <h2>About me?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias officiis recusandae fugiat tempore, magni praesentium
                ab reiciendis eos iure. Odit ex eligendi soluta recusandae
                adipisci molestias veritatis cum placeat dolore.
              </p>
            </div>
          )
        ) : null}
        {lang === "tr" ? (
          <div>
            <h2>Ben Kimim?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              officiis recusandae fugiat tempore, magni praesentium ab
              reiciendis eos iure. Odit ex eligendi soluta recusandae adipisci
              molestias veritatis cum placeat dolore.
            </p>
          </div>
        ) : null}
        {lang === "de" ? (
          <div>
            <h2>About Me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              officiis recusandae fugiat tempore, magni praesentium ab
              reiciendis eos iure. Odit ex eligendi soluta recusandae adipisci
              molestias veritatis cum placeat dolore.
            </p>
          </div>
        ) : null}

        <div className={this.state.classNameAdmin} onClick={this.toggleEdit}>
          <i className="fas fa-edit" /> <span> </span> <i>Düzenle</i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.language.language,
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(About);
