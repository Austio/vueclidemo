import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chrome: null,
    $http: null,
  },
  mutations: {
    initFromKibanaPlugin(state, { chrome, $http }) {
      state.chrome = chrome;
      state.$http = $http;
    },
    initFromWeb(state) {
    },
  },
  getters: {
    http(state) {
      return state.$http;
    },
}});
