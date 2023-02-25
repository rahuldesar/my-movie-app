const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  DETAIL: {
    BASE: "/detail",
    BY_MOVIE_ID: "/detail/:movieId",
  },
  SEARCH: {
    BASE: "/search",
    BY_QUERY: "/search/:query",
  },
};

export default ROUTES;
