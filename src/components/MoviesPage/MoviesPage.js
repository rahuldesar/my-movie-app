import { useContext, useEffect, useState } from "react";

import { PopularMovieContext } from "context/popularMoviesContext";

import PopularMovieAPI from "api/PopularMoviesAPI/PopularMoviesAPI";

import PAGINATION_SETTING from "constants/paginationSettings";
import API_SETTINGS from "constants/apiSettings";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import MovieListViewer from "components/MovieListViewer/MovieListViewer";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(PAGINATION_SETTING.START);
  const { movieData } = useContext(PopularMovieContext);
  const [isLoading, setIsLoading] = useState(true);

  // * Updates data from context or api with pagination query.
  useEffect(() => {
    updateNonSearchData();
  }, [movieData, currentPage]);

  // * Get Popular Movie Data from context or API call for new page.
  function updateNonSearchData() {
    if (currentPage == API_SETTINGS.DEFAULT_PAGE) {
      if (movieData.results) {
        setMovieList(movieData.results);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      PopularMovieAPI.get(currentPage).then((response) => {
        setMovieList(response.data.results);
        setIsLoading(false);
      });
    }
  }

  const updatePage = (newPageNo) => setCurrentPage(newPageNo);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="pt-5">
        <MovieListViewer
          movieList={movieList}
          currentPage={currentPage}
          updatePage={updatePage}
        />
      </div>
    );
  }
};

export default MoviesPage;
