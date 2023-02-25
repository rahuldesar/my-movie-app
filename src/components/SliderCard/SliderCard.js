import { Card } from "react-bootstrap";

import IMAGE_ROUTES from "constants/imageRoutes";

const SliderCard = ({ movie: currentMovie }) => {
  const sliderImagePath = `${IMAGE_ROUTES.SMALL}${currentMovie.poster_path}`;

  return (
    <>
      <Card className="card-main bg-transparent border-0 rounded-0 cursor-pointer overflow-hidden">
        <Card.Img variant="top" src={sliderImagePath} className="rounded-0" />
      </Card>
    </>
  );
};
export default SliderCard;
