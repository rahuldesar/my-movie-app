import { Badge, Card } from "react-bootstrap";

import IMAGE_ROUTES from "constants/imageRoutes";

const SliderCard = ({ movie: currentMovie }) => {
  const sliderImagePath = `${IMAGE_ROUTES.SMALL}${currentMovie.poster_path}`;
  const rating = currentMovie.vote_average.toFixed(1);
  return (
    <>
      <Card className="card-main bg-transparent relative border-0 rounded-0 cursor-pointer overflow-hidden">
        <Badge bg="secondary"  className="position-absolute rating-pill">{rating}</Badge>
        <Card.Img variant="top" src={sliderImagePath} className="rounded-0" />
      </Card>
    </>
  );
};
export default SliderCard;
