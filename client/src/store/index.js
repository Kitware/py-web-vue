import Vue from 'vue';
import Vuex from 'vuex';

import app from './app';
import wslink from './wslink';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: {
      app,
      wslink,
    },
  });
}

export default createStore;
