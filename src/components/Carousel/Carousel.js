import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = (props) => {
  const { children, cardVisible } = props;
  const [currentIndex, setCurrentIndex] = useState(cardVisible);
  const [length, setLength] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  // * Enables/resets transition after completing transition (by default on)
  useEffect(() => {
    if (currentIndex === cardVisible || currentIndex === length) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, cardVisible, length]);

  // * adds movies to left of slider (by inversing and adding)
  const additionalCardsPrev = () => {
    let extraCards = [];
    for (let index = 0; index < cardVisible; index++) {
      extraCards.push(children[length - 1 - index]);
    }
    extraCards.reverse();
    return extraCards;
  };

  // * adds movies to right of slider
  const additionalCardsNext = () => {
    let extraCards = [];
    for (let index = 0; index < cardVisible; index++) {
      extraCards.push(children[index]);
    }
    return extraCards;
  };

  // * event handlers for buttons
  const nextHandler = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const prevHandler = () => {
    setCurrentIndex(currentIndex - 1);
  };

  // * Resets slider when user presses button n times, where n is total movies in slider, (10 in our case)
  const resetTransition = () => {
    if (currentIndex < 1) {
      setTransitionEnabled(false);
      setCurrentIndex(length);
    } else if (currentIndex >= length + cardVisible) {
      setTransitionEnabled(false);
      setCurrentIndex(cardVisible);
    }
  };

  return (
    <div className="carousel-container overflow-hidden">
      <div className="carousel-wrapper pt-4 px-2  position-relative">
        <div className="carousel-content-wrapper  align-items-center ">
          <button
            onClick={prevHandler}
            className="btn btn-primary position-absolute prev-btn"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={nextHandler}
            className="btn btn-primary position-absolute next-btn"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {/* inline CSS is used so we can use dynamically assigned slider content count, and animate next, prev event */}
          <div
            className={`carousel-content d-flex card-visible-${cardVisible}`}
            style={{
              transform: `translate(-${currentIndex * (100 / cardVisible)}%)`,
              transition: !transitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => resetTransition()}
          >
            {length > cardVisible && additionalCardsPrev()}
            {children}
            {length > cardVisible && additionalCardsNext()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
