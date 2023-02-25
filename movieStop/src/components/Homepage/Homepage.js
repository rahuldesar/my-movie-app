import { useContext, useEffect, useState } from "react";

import MovieDetailAPI from "api/MovieDetailsAPI/MovieDetailsAPI";

import { PopularMovieContext } from "context/popularMoviesContext";

import Banner from "components/Banner/Banner";
import HomepageSlider from "components/HomepageSlider/HomepageSlider";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const Homepage = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { movieData } = useContext(PopularMovieContext);

  // * Sets Default banner to first of MovieData array.
  useEffect(() => {
    if (movieData.results) {
      setSelectedMovie(movieData.results[0].id);
    }
  }, [movieData]);

  // * Fetches data for banner selected from slider.
  useEffect(() => {
    if (selectedMovie) {
      MovieDetailAPI.get(selectedMovie).then((response) => {
        setBannerMovie(response.data);
        setIsLoading(false);
      });
    }
  }, [selectedMovie]);

  // * Updates banner with movieId: id
  function updateBanner(id) {
    setSelectedMovie(id);
  }

  if (!isLoading) {
    return (
      <div>
        <div className="homepage-wrapper position-relative w-100">
          <Banner bannerMovie={bannerMovie} />
          <HomepageSlider movieList={movieData} updateBanner={updateBanner} />
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default Homepage;
