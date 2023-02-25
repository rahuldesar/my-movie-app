import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

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

  if (!isLoading) {
    return (
      <div>
        <div className="homepage-wrapper position-relative w-100">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            loop="true"
            className="text-white"
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <Banner bannerMovie={bannerMovie} />
            </SwiperSlide>
          </Swiper>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Trending</h4>
            <HomepageSlider mode={0} list={movieData} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Popular Movies</h4>
            <HomepageSlider mode={0} list={movieData} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Popular TV shows</h4>
            <HomepageSlider mode={0} list={movieData} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Highest Rated Movies</h4>
            <HomepageSlider mode={0} list={movieData} />
          </div>
          <div className="mt-4 mb-0">
            <h4 className="ms-4">Highest Rated TV shows</h4>
            <HomepageSlider mode={0} list={movieData} />
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default Homepage;
