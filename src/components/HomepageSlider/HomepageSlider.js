import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import SliderCard from "components/SliderCard/SliderCard";

import ROUTES from "constants/routes";

//* mode 0 = movie, 1 = tv
const HomepageSlider = ({ mode, list }) => {
  const MOVIE_DETAILS = `${ROUTES.MOVIE_DETAIL.BASE}/:movieId`;
  const TV_DETAILS = `${ROUTES.TV_DETAIL.BASE}/:tvId`;
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
        mousewheel="true"
        className="text-white mx-4"
      >
        {list.results.map((item) => (
          // * active toggler handler + banner movie selector
          <SwiperSlide key={item.id}>
            <Link to={mode === 0 ? MOVIE_DETAILS.replace(":movieId", item.id) : TV_DETAILS.replace(":tvId", item.id)}>
              <SliderCard movie={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default HomepageSlider;
