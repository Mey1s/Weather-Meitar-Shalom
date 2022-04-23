import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Favorites from "./components/favorites/favorites";
import Home from "./components/home/home";
import Layout from "./layout/layout";
import { weatherAppStore } from "./redux/weather";
import NotFound from "./components/notFound/notFound";

function App() {
  return (
    <Router>
      <Provider store={weatherAppStore}>
        <Layout>
          <Switch>
            <Route path="/" element={<NotFound />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Switch>
          <ToastContainer position="top-right" />
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
