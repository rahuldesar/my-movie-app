import React, { createContext, useEffect, useState } from "react";

import TvPopularAPI from "api/TvAPI/TvPopularAPI";

export const PopularTvContext = createContext();

const PopularTvProvider = (props) => {
  const [tvData, setTvData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TvPopularAPI.get().then((response) => {
      setTvData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <PopularTvContext.Provider value={{ tvData, loading }}>
      {props.children}
    </PopularTvContext.Provider>
  );
};

export default PopularTvProvider;

