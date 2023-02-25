import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import IMAGE_ROUTES from "constants/imageRoutes";
import ROUTES from "constants/routes";

// * Contains 3 element Image(Movie-Backdrop), Image-Overlay, and Movie-Detail
const Banner = ({ bannerMovie: currentMovie }) => {
  const movieDetails = `${ROUTES.DETAIL.BASE}/${currentMovie.id}`;
  return (
    <>
      <div className="position-relative banner-wrapper">
        {/* Component 1 : Banner */}
        <div className="position-relative overflow-hidden bg-black banner-image-wrapper">
          <img
            src={`${IMAGE_ROUTES.ORIGINAL}${currentMovie.backdrop_path}`}
            className="img-fluid d-block m-auto banner-image"
            alt=""
          />
        </div>
        {/* Component 2 : Overlay */}
        <div className="dark-overlay position-absolute"></div>
        {/* Component 3 : Movie Details */}
        <div className="movie-details px-2 py-4 text-left">
          <h4>{currentMovie.title}</h4>
          <ul className="genre-items list-unstyled m-0 mb-2 p-0">
            {currentMovie.genres.map((genre) => (
              <li key={genre.id} className="d-inline pr-1">
                {genre.name}
              </li>
            ))}
          </ul>
          <Link to={movieDetails}>
            <button className="btn btn-primary rounded-0 mt-2 mb-3 py-1 px-3">
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </Link>
          <p>{currentMovie.overview}</p>
        </div>
      </div>
    </>
  );
};
export default Banner;
