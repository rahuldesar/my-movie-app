import BaseRequest from "api/BaseRequest";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `movie/:movie_id/credits?api_key=${apiKey}`,
};

class MovieCreditAPI {
  static get(movieId) {
    return BaseRequest.get(URL.INDEX.replace(":movie_id", movieId));
  }
}

export default MovieCreditAPI;
