import React from "react";
import { useSelector } from "react-redux";
import { WeatherAppState } from "../redux/weather";
import Footer from "./footer/footer";
import Header from "./header/header";

import "./layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useSelector((state: WeatherAppState) => state);
  return (
    // Detect if the mode is dark or light and changes the theme
    <div className="layoutContainer" data-theme={darkMode ? "dark" : "light"}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
