import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Favorites from "./components/favorites/favorites";
import Home from "./components/home/home";
import Layout from "./layout/layout";
import { weatherAppStore } from "./redux/weather";
import NotFound from "./components/notFound/notFound";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={weatherAppStore}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
