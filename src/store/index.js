import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { apiCall, APIs } from "../apiConfig";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getDictionary(context, payload) {
      return new Promise((resolve, reject) => {
        apiCall(APIs.getMeaning(payload))
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
