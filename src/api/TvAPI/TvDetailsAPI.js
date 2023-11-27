import BaseRequest from "api/BaseRequest";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `tv/:tv_id?api_key=${apiKey}&language=en-US`,
};

class TvDetailAPI {
  static get(tvId) {
    return BaseRequest.get(URL.INDEX.replace(":tv_id", tvId));
  }
}

export default TvDetailAPI;
