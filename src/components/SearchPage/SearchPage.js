import { useContext, useEffect, useState } from "react";

import MoviePopularAPI from "api/MovieAPI/MoviePopularAPI";
import MovieQueryAPI from "api/MovieAPI/MovieQueryAPI";

import { PopularMovieContext } from "context/popularMoviesContext";

import { useParams } from "react-router-dom";

import PAGINATION_SETTING from "constants/paginationSettings";
import API_SETTINGS from "constants/apiSettings";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import SearchForm from "components/SearchForm/SearchForm";
import MovieListViewer from "components/MovieListViewer/MovieListViewer";

const SearchPage = () => {
  const { query } = useParams();

  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(PAGINATION_SETTING.START);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovieList, setFilteredMovieList] = useState(null);

  const { movieData } = useContext(PopularMovieContext);

  // * Updates data from context for default '/search' or api with pagination query for '/search/:movie_id'.
  useEffect(() => {
    if (query) {
      updateSearchData();
    } else {
      updateNonSearchData();
    }
  }, [movieData, currentPage, query]);

  useEffect(() => {
    initializeFilteredMovieList();
  }, [movieList]);

  function updateNonSearchData() {
    if (currentPage === API_SETTINGS.DEFAULT_PAGE) {
      if (movieData.results) {
        setMovieList(movieData.results);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      MoviePopularAPI.get(currentPage).then((response) => {
        setMovieList(response.data.results);
        setIsLoading(false);
      });
    }
  }

  function updateSearchData() {
    setIsLoading(true);
    MovieQueryAPI.get(query, currentPage).then((response) => {
      setMovieList(response.data.results);
      setIsLoading(false);
    });
  }

  function initializeFilteredMovieList() {
    setFilteredMovieList(movieList);
  }

  const updatePage = (newPageNo) => setCurrentPage(newPageNo);

  const updateFilteredMovieList = (updatedList) => {
    setFilteredMovieList(updatedList);
  };

  return (
    <div className="pt-5">
      <SearchForm
        movieList={movieList}
        filteredMovieList={filteredMovieList}
        updateFilteredMovieList={updateFilteredMovieList}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <MovieListViewer
          movieList={filteredMovieList}
          currentPage={currentPage}
          updatePage={updatePage}
        />
      )}
    </div>
  );
};

export default SearchPage;
