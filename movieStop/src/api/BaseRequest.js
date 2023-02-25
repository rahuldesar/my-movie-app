import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const DEFAULT_HEADERS = {
  Accept: "application/json",
};

class BaseRequest {
  static headers() {
    return { headers: DEFAULT_HEADERS };
  }

  static get(url) {
    return axios.get(url, this.headers());
  }
}

export default BaseRequest;
