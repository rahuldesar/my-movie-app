import { Link } from "react-router-dom";

import IMAGE_ROUTES from "constants/imageRoutes";
import ROUTES from "constants/routes";

import noImage from "assets/images/no_image.png";

const MoviesCard = ({ movieDetails }) => {
  const detailRoute = `${ROUTES.MOVIE_DETAIL.BASE}/${movieDetails.id}`;
  const smallImageRoute = movieDetails.poster_path
    ? `${IMAGE_ROUTES.SMALL}${movieDetails.poster_path}`
    : noImage;

  return (
    <div className="movie-card-wrapper py-2">
      <Link to={detailRoute} className="text-decoration-none">
        <div className="movie-card">
          <div className="border border-4 border-light rounded m-2">
            <img
              src={smallImageRoute}
              className="img-fluid"
              alt={`Poster of ${movieDetails.title}`}
            />
          </div>
          <h4 className="ms-2 fs-5 text-light lh-1">{movieDetails.title}</h4>
          <h4 className="ms-2 fs-6 lh-1 card-year">
            {movieDetails.release_date.slice(0, 4)}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default MoviesCard;
