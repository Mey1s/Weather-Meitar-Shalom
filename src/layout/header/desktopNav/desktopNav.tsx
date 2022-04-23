import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  weatherAppStore,
  WeatherAppState,
  toggleDarkmode,
  changeTemperatureUnit,
} from "../../../redux/weather";

import "./desktopNav.scss";
import { NavItem } from "../../../types/navItem";
import { navItems } from "../../../consts";

const DesktopNav: React.FC = () => {
  const darkMode = useSelector((state: WeatherAppState) => state.darkMode);
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );

  const onDarkModeButtonClicked = () => {
    weatherAppStore.dispatch(toggleDarkmode());
  };

  const onTemperatureUnitButtonClicked = () => {
    weatherAppStore.dispatch(changeTemperatureUnit());
  };

  return (
    <div className="desktopNavHeader">
      <nav className="navHeader">
        <ul className="listNavHeader">
          {navItems.map((navItem: NavItem, i: number) => {
            return (
              <li key={i} className="itemListNavHeader">
                <Link to={navItem.link} className="linkItemListNavHeader">
                  {navItem.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="headerButtons">
        <button className="darkModeButton" onClick={onDarkModeButtonClicked}>
          {darkMode ? (
            <span>
              <i className="fa fa-sun-o" aria-hidden="true"></i> Light Mode
            </span>
          ) : (
            <span>
              <i className="fa fa-moon-o" aria-hidden="true"></i> Dark Mode
            </span>
          )}
        </button>
        <button
          className="temperatureUnitButton"
          onClick={onTemperatureUnitButtonClicked}
        >
          <span>
            <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
            {temperatureUnit === "C" ? " Change to F" : " Change to C"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
