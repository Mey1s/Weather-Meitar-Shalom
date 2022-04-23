import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.scss";
import {
  weatherAppStore,
  WeatherAppState,
  toggleDarkmode,
  changeTemperatureUnit,
} from "../../redux/weather";
import DesktopNav from "./desktopNav/desktopNav";
import MobileNav from "./mobileNav/mobileNav";



const Header: React.FC = () => {


  return (
    <header className="headerContainer">
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

export default Header;
