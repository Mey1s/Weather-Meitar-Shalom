import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./header.css";
import {
  weatherAppStore,
  WeatherAppState,
  toggleDarkmode,
  changeTemperatureUnit,
} from "../../redux/weather";

interface NavItemI {
  title: string;
  link: string;
}

const Header = () => {
  const darkMode = useSelector((state: WeatherAppState) => state.darkMode);
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );

  const navItems: NavItemI[] = [
    { title: "Home", link: "/" },
    { title: "Favorites", link: "/favorites" },
  ];

  const onDarkModeButtonClicked = () => {
    weatherAppStore.dispatch(toggleDarkmode());
  };

  const onTemperatureUnitButtonClicked = () => {
    weatherAppStore.dispatch(changeTemperatureUnit());
  };

  return (
    <header className="headerContainer">
      <nav className="navHeader">
        <ul className="listInNavHeader">
          {navItems.map((navItem: NavItemI, i: number) => {
            return (
              <li key={i} className="itemListInNavHeader">
                <Link to={navItem.link} className="linkInItemListInNavHeader">
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
    </header>
  );
};

export default Header;
