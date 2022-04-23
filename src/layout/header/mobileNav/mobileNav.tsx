import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  weatherAppStore,
  WeatherAppState,
  toggleDarkmode,
  changeTemperatureUnit,
} from "../../../redux/weather";
import "./mobileNav.scss";
import { navItems } from "../../../consts";
import { NavItem } from "../../../types/navItem";

const MobileNav: React.FC = () => {
  const darkMode = useSelector((state: WeatherAppState) => state.darkMode);
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const onDarkModeButtonClicked = () => {
    weatherAppStore.dispatch(toggleDarkmode());
  };

  const onTemperatureUnitButtonClicked = () => {
    weatherAppStore.dispatch(changeTemperatureUnit());
  };

  return (
    <div className="mobileNavHeaderContainer">
      <i
        className="fa fa-bars"
        aria-hidden="true"
        onClick={() => setShowMenu((prev) => !prev)}
      ></i>
      {showMenu && (
        <div className="mobileNavHeader">
          <nav className="mobileNavHeader">
            <ul className="mobileListNavHeader">
              {navItems.map((navItem: NavItem, i: number) => {
                return (
                  <li key={i} className="mobileItemListNavHeader">
                    <Link
                      to={navItem.link}
                      className="mobileLinkItemListNavHeader"
                    >
                      {navItem.title}
                    </Link>
                  </li>
                );
              })}
              <li
                className="mobileItemListNavHeader"
                onClick={onDarkModeButtonClicked}
              >
                {" "}
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
                <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                {temperatureUnit === "C" ? " Change to F" : " Change to C"}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
