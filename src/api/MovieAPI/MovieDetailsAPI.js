import BaseRequest from "api/BaseRequest";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `movie/:movie_id?api_key=${apiKey}&language=en-US`,
};

class MovieDetailAPI {
  static get(movieId) {
    return BaseRequest.get(URL.INDEX.replace(":movie_id", movieId));
  }
}

export default MovieDetailAPI;
