import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import SliderCard from "components/SliderCard/SliderCard";

import ROUTES from "constants/routes";

//* mode 0 = movie, 1 = tv
const HomepageSlider = ({ mode, list }) => {
  const MOVIE_DETAILS = `${ROUTES.DETAIL.BASE}/:movieId`;
  const TV_DETAILS = `${ROUTES.DETAIL.BASE}/:movieId`;
  return (
    <>
      <Swiper
        spaceBetween={15}
        slidesPerView={8}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 6,
          },
          800: {
            slidesPerView: 8,
          },
        }}
        loop="true"
        className="text-white mx-4"
        modules={[Autoplay]}
      >
        {list.results.map((movie) => (
          // * active toggler handler + banner movie selector
          <SwiperSlide key={movie.id}>
            <Link
              to={
                mode === 0
                  ? MOVIE_DETAILS.replace(":movieId", movie.id)
                  : TV_DETAILS
              }
            >
              <SliderCard movie={movie} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default HomepageSlider;
