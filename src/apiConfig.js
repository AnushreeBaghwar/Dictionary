import axios from "axios";

let headers = {
  "Content-Type": "application/json",
};

const serverUrl = "http://localhost:3000";

const APIs = {
  getMeaning(word) {
    return {
      url: "/api/" + word,
      method: "get",
      ...headers,
    };
  },
};
const apiCall = (payload) => {
  payload.url = serverUrl + payload.url;
  return axios(payload);
};

export { apiCall, APIs };
