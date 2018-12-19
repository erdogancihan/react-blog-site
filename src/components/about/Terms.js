import React, { Component } from "react";
import { connect } from "react-redux";

class Terms extends Component {
  render() {
    const { lang } = this.props;

    return (
      <div className="about-container">
        {lang === "en" ? (
          <div>
           
            <h2>Terms and Conditions</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              officiis recusandae fugiat tempore, magni praesentium ab
              reiciendis eos iure. Odit ex eligendi soluta recusandae adipisci
              molestias veritatis cum placeat dolore.
            </p>
          </div>
        ) : null}
        {lang === "tr" ? (
          <div>
            <h2>Kullanım Koşulları</h2>
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
            <h2>Terms and Conditions</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              officiis recusandae fugiat tempore, magni praesentium ab
              reiciendis eos iure. Odit ex eligendi soluta recusandae adipisci
              molestias veritatis cum placeat dolore.
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.language.language,
  };
};

export default connect(mapStateToProps)(Terms);
