import React, { createContext, useEffect, useState } from "react";

import MoviePopularAPI from "api/MovieAPI/MoviePopularAPI";

export const PopularMovieContext = createContext();

const PopularMoviesProvider = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MoviePopularAPI.get().then((response) => {
      setMovieData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <PopularMovieContext.Provider value={{ movieData, loading }}>
      {props.children}
    </PopularMovieContext.Provider>
  );
};

export default PopularMoviesProvider;
