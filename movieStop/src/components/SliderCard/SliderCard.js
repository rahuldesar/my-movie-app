import { Card } from "react-bootstrap";

import IMAGE_ROUTES from "constants/imageRoutes";

// * This contains two elements: Movie Image(Poster), and Movie Title
const SliderCard = ({ movie: currentMovie }) => {
  const sliderImagePath = `${IMAGE_ROUTES.SMALL}${currentMovie.poster_path}`;

  return (
    <>
      <Card className="card-main m-2 m-md-0 p-4  p-xl-4 p-lg-3 pb-xl-1 p-md-5  pb-md-0 bg-transparent border-0 cursor-pointer">
        <Card.Img
          variant="top"
          src={sliderImagePath}
          className="overflow-visible"
        />
        <Card.Body className="mt-1 p-0 text-left ">
          <Card.Title>{currentMovie.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};
export default SliderCard;
