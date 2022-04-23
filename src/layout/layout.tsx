import React from "react";
import { useSelector } from "react-redux";
import { WeatherAppState } from "../redux/weather";
import Footer from "./footer/footer";
import Header from "./header/header";

import "./layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const darkMode = useSelector((state: WeatherAppState) => state.darkMode);
  return (
    <div className="layoutContainer" data-theme={darkMode ? "dark" : "light"}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
