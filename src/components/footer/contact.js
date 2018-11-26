import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <p className="text-center">Name lastName</p>
      <p className="text-center">
        <a href="mailto:aa@aa.com">
          <i className="fas fa-envelope" /> email@email.com
        </a>{" "}
        <i className="fas fa-phone" /> +49(123) 456789
      </p>
      <p className="text-center">Copyright &copy; 2018,Developed by E.C.</p>
    </div>
  );
};

export default Contact;
