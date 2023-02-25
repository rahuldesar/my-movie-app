import BaseRequest from "api/BaseRequest";

import API_SETTINGS from "constants/apiSettings";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `search/movie?api_key=${apiKey}&language=en-US&query=:movie_name&page=:page_no`,
};

class MovieQueryAPI {
  // * default value of page no = 1
  static get(movieName, pageNo = API_SETTINGS.DEFAULT_PAGE) {
    return BaseRequest.get(
      URL.INDEX.replace(":movie_name", movieName).replace(":page_no", pageNo)
    );
  }
}

export default MovieQueryAPI;
