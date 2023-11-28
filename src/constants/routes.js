const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  TV: "/tv",
  MOVIE_DETAIL: {
    BASE: "/movie/detail",
    BY_MOVIE_ID: "/movie/detail/:movieId",
  },
  TV_DETAIL: {
    BASE: "/series/detail",
    BY_TV_ID: "/series/detail/:tvId",
  },
  SEARCH: {
    BASE: "/search",
    BY_QUERY: "/search/:query",
  },
};

export default ROUTES;
