import { useContext, useEffect, useState } from "react";

import MoviePopularAPI from "api/MovieAPI/MoviePopularAPI";
import MovieQueryAPI from "api/MovieAPI/MovieQueryAPI";

import { PopularMovieContext } from "context/popularMoviesContext";
import { PopularTvContext } from "context/popularTvContext";

import { useParams } from "react-router-dom";

import PAGINATION_SETTING from "constants/paginationSettings";
import API_SETTINGS from "constants/apiSettings";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import SearchForm from "components/SearchForm/SearchForm";
import MovieListViewer from "components/MovieListViewer/MovieListViewer";
import TvQueryAPI from "api/TvAPI/TvQueryAPI";
import TvPopularAPI from "api/TvAPI/TvPopularAPI";

const SearchPage = () => {
  const { query } = useParams();

  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [mergedList, setMergedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(PAGINATION_SETTING.START);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovieList, setFilteredMovieList] = useState(null);

  const { movieData } = useContext(PopularMovieContext);
  const { tvData } = useContext(PopularTvContext);

  // * Updates data from context for default '/search' or api with pagination query for '/search/:movie_id'.
  useEffect(() => {
    if (query) {
      updateSearchData();
    } else {
      updateNonSearchData();
    }
  }, [movieData, currentPage, query]);

  useEffect(() => {
    if (mergedList.length > 1) {
      initializeFilteredMovieList();
    }
  }, [mergedList]);

  function prepareMovie(movies) {
    movies.forEach((movie) => {
      movie.type = "movie";
    });
  }

  function prepareTv(tvShows) {
    tvShows.forEach((tv) => {
      tv.type = "tv";
    });
  }

  function sortByPopularity(data) {
    return data.sort((a, b) => b.popularity - a.popularity);
  }

  useEffect(() => {
    prepareMovie(movieList);
    prepareTv(tvList);
    setMergedList(sortByPopularity([...movieList, ...tvList]));
  }, [movieList, tvList]);

  function updateNonSearchData() {
    if (currentPage === API_SETTINGS.DEFAULT_PAGE) {
      if (movieData.results && tvData.results) {
        setMovieList(movieData.results);
        setTvList(tvData.results);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);

      const fetchPopularMovies = async () => {
        const response = await MoviePopularAPI.get(query, currentPage);
        setMovieList(response.data.results);
      };

      const fetchPopularTvs = async () => {
        const response = await TvPopularAPI.get(query, currentPage);
        setTvList(response.data.results);
      };

      Promise.all([fetchPopularMovies(), fetchPopularTvs()]).then(() => {
        setIsLoading(false);
      });
    }
  }

  function updateSearchData() {
    setIsLoading(true);

    const fetchMovies = async () => {
      const response = await MovieQueryAPI.get(query, currentPage);
      setMovieList(response.data.results);
    };

    const fetchTvs = async () => {
      const response = await TvQueryAPI.get(query, currentPage);
      setTvList(response.data.results);
    };

    Promise.all([fetchMovies(), fetchTvs()]).then(() => {
      setIsLoading(false);
    });
  }

  function initializeFilteredMovieList() {
    setFilteredMovieList(mergedList);
  }

  const updatePage = (newPageNo) => setCurrentPage(newPageNo);

  // TODO : Update accordingly - currently only shows the mergedlist
  const updateFilteredMovieList = (_updatedList) => {
    setFilteredMovieList(mergedList);
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
        <MovieListViewer movieList={filteredMovieList} currentPage={currentPage} updatePage={updatePage} />
      )}
    </div>
  );
};

export default SearchPage;
