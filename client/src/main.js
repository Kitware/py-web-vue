import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';
import 'typeface-roboto';

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueVTK from 'vue-vtk-js';

import App from './components/App';
import Loading from './components/Loading';

import store from './store';

Vue.component('vtk-loading', Loading);

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueVTK);

new Vue({
  vuetify: new Vuetify(),
  router: new VueRouter(),
  store,
  render: (h) => h(App),
}).$mount('#app');
