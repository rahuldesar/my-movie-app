import { useState } from "react";

import Carousel from "components/Carousel/Carousel";

import { useWindowDimensions } from "utils/getDimensions";

import SliderCard from "components/SliderCard/SliderCard";

const HomepageSlider = ({ movieList, updateBanner }) => {
  const [active, setActive] = useState(movieList.results[0]);

  // * custom hook to read screen size (we only need width)
  const { width } = useWindowDimensions();

  const moviesForSlider = movieList.results.slice(0, 10);
  let cardCount;

  // * Count of cards shown in different screen sizes
  function getCardCounts(width) {
    switch (true) {
      case width < 500:
        return 2;
      case width < 900:
        return 3;
      default:
        return 8;
    }
  }

  cardCount = getCardCounts(width);

  return (
    <div className="slider-wrapper w-100 ">
      <Carousel cardVisible={cardCount}>
        {moviesForSlider.map((movie) => (
          // * active toggler handler + banner movie selector
          <div
            onClick={() => {
              setActive(movie);
              updateBanner(movie.id);
            }}
            key={movie.id}
            className={`${active == movie && "active-card"}`}
          >
            <SliderCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default HomepageSlider;
