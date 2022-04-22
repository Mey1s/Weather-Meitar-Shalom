import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Favorites from "./components/favorites/favorites";
import Home from "./components/home/home";
import Layout from "./layout/layout";
import { weatherAppStore } from "./redux/weather";

function App() {
  return (
    <Router>
      <Provider store={weatherAppStore}>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Switch>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
