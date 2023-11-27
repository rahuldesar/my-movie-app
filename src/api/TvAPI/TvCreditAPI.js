import BaseRequest from "api/BaseRequest";

const apiKey = process.env.REACT_APP_API_KEY;

const URL = {
  INDEX: `tv/:tv_id/credits?api_key=${apiKey}&language=en-US`,
};

class TvCreditAPI {
  static get(tvId) {
    return BaseRequest.get(URL.INDEX.replace(":tv_id", tvId));
  }
}

export default TvCreditAPI;
