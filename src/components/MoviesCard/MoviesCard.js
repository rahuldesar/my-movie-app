import { Link } from "react-router-dom";

import IMAGE_ROUTES from "constants/imageRoutes";
import ROUTES from "constants/routes";

import noImage from "assets/images/no_image.png";
import { Badge } from "react-bootstrap";

const MoviesCard = ({ movieDetails }) => {
  const movieDetailRoute =
    movieDetails.type == "tv"
      ? `${ROUTES.TV_DETAIL.BASE}/${movieDetails.id}}`
      : `${ROUTES.MOVIE_DETAIL.BASE}/${movieDetails.id}`;

  const smallImageRoute = movieDetails.poster_path ? `${IMAGE_ROUTES.SMALL}${movieDetails.poster_path}` : noImage;
  const rating = movieDetails.vote_average.toFixed(1);

  console.log(movieDetails);

  return (
    <div className="movie-card-wrapper py-2">
      <Link to={movieDetailRoute} className="text-decoration-none">
        <div className="movie-card position-relative">
          <Badge bg="secondary" className="position-absolute rating-pill-detail-page">
            {rating}
          </Badge>
          <div className="border border-4 border-light rounded m-2">
            <img src={smallImageRoute} className="img-fluid" alt={`Poster of ${movieDetails.title}`} />
          </div>
          <h4 className="ms-2 fs-5 text-light lh-1">{movieDetails.title || movieDetails.name}</h4>
          <h4 className="ms-2 fs-6 lh-1 card-year">
            {(movieDetails.release_date && movieDetails.release_date.slice(0, 4)) ||
              (movieDetails.first_air_date && movieDetails.first_air_date.slice(0,4))}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default MoviesCard;
