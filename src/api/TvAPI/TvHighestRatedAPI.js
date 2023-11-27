import BaseRequest from "api/BaseRequest";

import API_SETTINGS from "constants/apiSettings";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `/tv/top_rated?api_key=${apiKey}&language=en-US&page=:page_no`,
};

class TvHighestRatedAPI {
  // * default value of page no = 1
  static get(pageNo = API_SETTINGS.DEFAULT_PAGE) {
    return BaseRequest.get(URL.INDEX.replace(":page_no", pageNo));
  }
}

export default TvHighestRatedAPI;
