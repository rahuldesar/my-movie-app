import { useContext, useEffect, useState } from "react";

import { PopularTvContext } from "context/popularTvContext";

import PAGINATION_SETTING from "constants/paginationSettings";
import API_SETTINGS from "constants/apiSettings";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import MovieListViewer from "components/MovieListViewer/MovieListViewer";
import TvPopularAPI from "api/TvAPI/TvPopularAPI";

const TvPage = () => {
  const [tvList, setTvList] = useState([]);
  const [currentPage, setCurrentPage] = useState(PAGINATION_SETTING.START);
  const { tvData } = useContext(PopularTvContext);
  const [isLoading, setIsLoading] = useState(true);

  function prepareTv(tvShows) {
    tvShows.forEach((tv) => {
      tv.type = "tv";
    });
  }
  // * Updates data from context or api with pagination query.
  useEffect(() => {
    updateNonSearchData();
  }, [tvData, currentPage]);

  // * Get Popular Movie Data from context or API call for new page.
  function updateNonSearchData() {
    if (currentPage == API_SETTINGS.DEFAULT_PAGE) {
      if (tvData.results) {
        let updatedList = tvData.results;
        prepareTv(updatedList);
        setTvList(updatedList);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      TvPopularAPI.get(currentPage).then((response) => {
        let updatedList = response.data.results;
        prepareTv(updatedList);
        setTvList(updatedList);
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
        <MovieListViewer movieList={tvList} currentPage={currentPage} updatePage={updatePage} />
      </div>
    );
  }
};

export default TvPage;
