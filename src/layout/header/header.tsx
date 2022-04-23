import React from "react";
import DesktopNav from "./desktopNav/desktopNav";
import MobileNav from "./mobileNav/mobileNav";

import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="headerContainer">
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

export default Header;
