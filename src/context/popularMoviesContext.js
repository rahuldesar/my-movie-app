import React, { createContext, useEffect, useState } from "react";

import PopularMovieAPI from "api/PopularMoviesAPI/PopularMoviesAPI";

export const PopularMovieContext = createContext();

const PopularMoviesProvider = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PopularMovieAPI.get().then((response) => {
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
