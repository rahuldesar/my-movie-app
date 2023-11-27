import BaseRequest from "api/BaseRequest";

import API_SETTINGS from "constants/apiSettings";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `trending/tv/week?api_key=${apiKey}`,
};

class TvTrendingAPI {
  // * default value of page no = 1
  static get(pageNo = API_SETTINGS.DEFAULT_PAGE) {
    return BaseRequest.get(URL.INDEX.replace(":page_no", pageNo));
  }
}

export default TvTrendingAPI;
