import { useContext, useEffect, useState } from "react";

import MovieDetailAPI from "api/MovieAPI/MovieDetailsAPI";

import { PopularMovieContext } from "context/popularMoviesContext";
import { PopularTvContext } from "context/popularTvContext";

import HomepageSlider from "components/HomepageSlider/HomepageSlider";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import MovieHighestRatedAPI from "api/MovieAPI/MovieHighestRatedAPI";
import TvHighestRatedAPI from "api/TvAPI/TvHighestRatedAPI";
import MovieTrendingAPI from "api/MovieAPI/MovieTrendingAPI";
import TvTrendingAPI from "api/TvAPI/TvTrendingAPI";
import Banner from "components/Banner/Banner";

const Homepage = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovie, setBannerMovie] = useState([]);
  const [isBannerLoading, setIsBannerLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);
  const [highestRatedTv, setHighestRatedTv] = useState([]);

  const { movieData, loading: isMovieContextLoading } = useContext(PopularMovieContext);
  const { tvData, loading: isTvContextLoading } = useContext(PopularTvContext);

  const isContextLoading = isMovieContextLoading || isTvContextLoading;

  // * Sets Default banner to first of MovieData array.
  useEffect(() => {
    if (!isContextLoading) {
      setPopularMovies(movieData);
      setSelectedMovie(movieData.results[0].id);
      setPopularTv(tvData);
    }
  }, [isContextLoading]);

  // * Fetches data for banner selected from slider.
  useEffect(() => {
    if (selectedMovie) {
      MovieDetailAPI.get(selectedMovie).then((response) => {
        setBannerMovie(response.data);
        setIsBannerLoading(false);
      });
    }
  }, [selectedMovie]);

  useEffect(() => {
    setIsLoading(true);
    // --- These come from context ----
    // const fetchPopularTv = async () => {
    //   const response = await TvPopularAPI.get();
    //   setPopularTv(response.data);
    // };

    // const fetchPopularMovies = async () => {
    //   const response = await MoviePopularAPI.get();
    //   setPopularMovies(response.data);
    // };

    const fetchHighestRatedTv = async () => {
      const response = await TvHighestRatedAPI.get();
      setHighestRatedTv(response.data);
    };

    const fetchHighestRatedMovies = async () => {
      const response = await MovieHighestRatedAPI.get();
      setHighestRatedMovies(response.data);
    };

    const fetchTrendingMovies = async () => {
      const response = await MovieTrendingAPI.get();
      setTrendingMovies(response.data);
    };

    const fetchTrendingTv = async () => {
      const response = await TvTrendingAPI.get();
      setTrendingTv(response.data);
    };

    Promise.all([
      // fetchPopularTv(),
      // fetchPopularMovies(),
      fetchHighestRatedTv(),
      fetchHighestRatedMovies(),
      fetchTrendingMovies(),
      fetchTrendingTv(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (!isBannerLoading && !isLoading && !isContextLoading) {
    return (
      <div>
        <div className="homepage-wrapper position-relative w-100">
          <Banner bannerMovie={bannerMovie} />
          {/* <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            loop="true"
            className="text-white"
          >
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>
          </Swiper> */}

          <div className="mt-4 mb-0">
            <h4 className="ms-4">Trending Movies</h4>
            <HomepageSlider mode={0} list={trendingMovies} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Trending Tv</h4>
            <HomepageSlider mode={1} list={trendingTv} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Popular Movies</h4>
            <HomepageSlider mode={0} list={popularMovies} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Popular TV shows</h4>
            <HomepageSlider mode={1} list={popularTv} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Highest Rated Movies</h4>
            <HomepageSlider mode={0} list={highestRatedMovies} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Highest Rated TV shows</h4>
            <HomepageSlider mode={1} list={highestRatedTv} />
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default Homepage;
