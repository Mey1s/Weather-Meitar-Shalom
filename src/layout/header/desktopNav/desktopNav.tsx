import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as weather from "../../../redux/weather";
import { NavItem } from "../../../types/navItem";
import { celciusSign, fahrenheitSign, navItems } from "../../../consts";

import "./desktopNav.scss";

const DesktopNav: React.FC = () => {
  const { darkMode, temperatureUnit } = useSelector(
    (state: weather.WeatherAppState) => state
  );

  // Update dark mode state
  const onDarkModeButtonClicked = () => {
    weather.weatherAppStore.dispatch(weather.toggleDarkmode());
  };

  // Update temperature unit state
  const onTemperatureUnitButtonClicked = () => {
    weather.weatherAppStore.dispatch(weather.changeTemperatureUnit());
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
          {/* Switch between dark and light themes */}
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
            {/* Switch between celsius and fahrenheit degrees */}
            {temperatureUnit === celciusSign
              ? ` Change to ${fahrenheitSign}`
              : ` Change to ${celciusSign}`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
