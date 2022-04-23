import React from "react";

import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footerContainer">
      <h4>
        <i className="fa fa-copyright" aria-hidden="true"></i> Meitar Shalom
      </h4>
      <p>Email: meytar733@gmail.com</p>
      <p>Phone: 0526621819</p>
    </footer>
  );
};

export default Footer;
