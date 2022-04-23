import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as weather from "../../../redux/weather";
import { celciusSign, fahrenheitSign, navItems } from "../../../consts";
import { NavItem } from "../../../types/navItem";

import "./mobileNav.scss";

const MobileNav = () => {
  const { darkMode, temperatureUnit } = useSelector(
    (state: weather.WeatherAppState) => state
  );
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  // Update dark mode state
  const onDarkModeButtonClicked = () => {
    weather.weatherAppStore.dispatch(weather.toggleDarkmode());
  };

  // Update temperature unit state
  const onTemperatureUnitButtonClicked = () => {
    weather.weatherAppStore.dispatch(weather.changeTemperatureUnit());
  };

  return (
    <div className="mobileNavHeaderContainer">
      {/* On click on the bars icon the menu open or close */}
      <i
        className="fa fa-bars"
        aria-hidden="true"
        onClick={() => setShowMenu((prev) => !prev)}
      ></i>
      {/* If the bars icon was clicked the menu open */}
      {showMenu && (
        <div className="mobileNavHeader">
          <nav className="mobileNavHeader">
            <ul className="mobileListNavHeader">
              {navItems.map((navItem: NavItem, i: number) => (
                <li key={i} className="mobileItemListNavHeader">
                  <Link
                    to={navItem.link}
                    className="mobileLinkItemListNavHeader"
                  >
                    {navItem.title}
                  </Link>
                </li>
              ))}
              <li
                className="mobileItemListNavHeader"
                onClick={onDarkModeButtonClicked}
              >
                {/* Switch between dark and light themes */}
                {darkMode ? (
                  <span>
                    <i className="fa fa-sun-o" aria-hidden="true"></i> Light
                    Mode
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-moon-o" aria-hidden="true"></i> Dark
                    Mode
                  </span>
                )}
              </li>
              <li
                className="mobileItemListNavHeader"
                onClick={onTemperatureUnitButtonClicked}
              >
                {/* Switch between celsius and fahrenheit degrees */}
                <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                {temperatureUnit === celciusSign
                  ? ` Change to ${fahrenheitSign}`
                  : ` Change to ${celciusSign}`}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
