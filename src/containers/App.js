import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ROUTES from "constants/routes";

import Home from "pages/Home";
import Movies from "pages/Movies";
import Detail from "pages/Detail";
import Search from "pages/Search";

import PopularMoviesProvider from "context/popularMoviesContext";

const App = () => (
  <Router>
    <PopularMoviesProvider>
      <div className="bg-dark">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />;
          <Route path={ROUTES.MOVIES} element={<Movies />} />;
          <Route path={ROUTES.SEARCH.BASE} element={<Search />} />;
          <Route path={ROUTES.SEARCH.BY_QUERY} element={<Search />} />;
          <Route path={ROUTES.MOVIE_DETAIL.BY_MOVIE_ID} element={<Detail />} />;
          <Route path={ROUTES.TV_DETAIL.BY_TV_ID} element={<Detail />} />;
        </Routes>
      </div>
    </PopularMoviesProvider>
  </Router>
);

export default App;
