import Vue from 'vue';
import App from './components/App';
import Loading from './components/Loading';

// ----------------------------------------------------------------------------
Vue.config.productionTip = false;
// ----------------------------------------------------------------------------

export async function connect(store, done = null) {
  await store.dispatch('WS_CONNECT');
  const serverState = await store.dispatch('WS_INIT');
  store.dispatch('APP_INIT', serverState);

  if (done) {
    done(store);
  }

  return store;
}

// ----------------------------------------------------------------------------

export async function createVueApp(store) {
  Vue.component('vtk-loading', Loading);

  const options = {};

  if (store.getters.APP_USE.includes('vuetify')) {
    console.log('Add vuetify');
    await Promise.all([
      import('typeface-roboto'),
      import('@mdi/font/css/materialdesignicons.css'),
      import('vuetify/dist/vuetify.min.css'),
    ]);
    const { default: Vuetify } = await import('vuetify');
    Vue.use(Vuetify);
    options.vuetify = new Vuetify(store.getters.APP_VUETIFY_CONFIG);
  }

  if (store.getters.APP_USE.includes('router')) {
    console.log('Add Router');
    const { default: VueRouter } = await import('vue-router');
    Vue.use(VueRouter);
    options.router = new VueRouter();
  }

  if (store.getters.APP_USE.includes('vtk')) {
    console.log('Add VTK');
    const { default: VueVTK } = await import('vue-vtk-js');
    Vue.use(VueVTK);
  }

  new Vue({
    ...options,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}
