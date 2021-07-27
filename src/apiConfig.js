import axios from "axios";

let headers = {
  "Content-Type": "application/json",
};

const serverUrl = "https://mydictionary-backend.herokuapp.com";

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
