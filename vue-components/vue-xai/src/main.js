import Vue from 'vue';
import App from './test/TestApp';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
