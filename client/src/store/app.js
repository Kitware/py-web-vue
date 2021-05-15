import { loadScript, loadCSS } from 'vtk.js/Sources/IO/Core/ResourceLoader';
import Vue from 'vue';

const SHARED_STATE = {};
const SHARED_STATE_DIRTY_KEYS = new Set();

function get(obj, path) {
  let current = obj;
  const steps = path.split('.');
  for (let i = 0; i < steps.length; i++) {
    current = current[steps[i]];
  }
  return current;
}

export default {
  state: {
    appName: 'PyWebVue',
    vuetifyConfig: {},
    mainPageTemplate: '<vtk-loading message="Please wait while application is loading..."/>',
    stateTS: 0,
    serverStateKeys: [],
    actions: [],
    routes: [],
    use: [],
  },
  getters: {
    APP_GET(state) {
      // eslint-disable-next-line
      state.stateTS;
      return (key) => SHARED_STATE[key];
    },
    APP_VUETIFY_CONFIG(state) {
      return state.vuetifyConfig;
    },
    APP_TEMPLATE(state) {
      return state.mainPageTemplate;
    },
    APP_ACTIONS(state) {
      return state.actions;
    },
    APP_ROUTES(state) {
      return state.routes;
    },
    APP_USE(state) {
      return state.use;
    },
    APP_HTML_SCRIPTS(state) {
      return state.htmlScripts;
    },
  },
  mutations: {
    async APP_INIT_SET(state, {
      name,
      vuetify,
      layout,
      routes,
      state: sharedState,
      scripts,
      styles,
      use,
      stateListening,
      favicon,
    }) {
      // First update state
      Object.assign(SHARED_STATE, sharedState);
      state.stateTS++;

      // Update HTML to reflect Application properties
      document.title = name;
      if (favicon) {
        document.querySelector('link[rel=icon]').href = favicon;
      }

      // Global setup
      state.appName = name;
      state.vuetifyConfig = vuetify;
      state.serverStateKeys = stateListening;
      state.routes = routes;
      state.use = use;

      // Load exteranl scripts/css
      await Promise.all(styles.map(loadCSS));
      // Allow the last script to wait for the others to be loaded
      // There is a chance that the last script is user specific.
      const lastScript = scripts.pop();
      await Promise.all(scripts.map(loadScript));
      if (lastScript) {
        await loadScript(lastScript);
      }

      use.forEach((libName) => {
        window.get = get;
        let lib = get(window, libName);

        // Invalid lib name
        if (!lib) {
          return;
        }

        if (lib.default) {
          lib = lib.default;
        }

        console.log(`Vue.use(${libName}) - ${!!lib} - install(${!!lib.install})`);
        if (lib.install) {
          Vue.use(lib);
        } else {
          Vue.use({ install: lib });
        }
      });

      // Last update template
      state.mainPageTemplate = layout;
    },
    APP_TEMPLATE_SET(state, value) {
      state.mainPageTemplate = value;
    },
    APP_ACTIONS_SET(state, value) {
      state.actions = value;
    },
  },
  actions: {
    async APP_INIT({ state, dispatch, commit }, serverState) {
      commit('APP_INIT_SET', serverState);
      dispatch('WS_STATE_SUBSCRIBE', ([modifiedState]) => {
        Object.assign(SHARED_STATE, modifiedState);
        state.stateTS++;
      });
      dispatch('WS_ACTIONS_SUBSCRIBE', ([actions]) => {
        commit('APP_ACTIONS_SET', actions);
      });
      dispatch('WS_LAYOUT_SUBSCRIBE', ([template]) => {
        commit('APP_TEMPLATE_SET', template);
      });
    },
    APP_SET({ state, dispatch }, { key, value }) {
      SHARED_STATE[key] = value;
      if (state.serverStateKeys.indexOf(key) !== -1) {
        SHARED_STATE_DIRTY_KEYS.add(key);
        dispatch('APP_FLUSH_DIRTY_STATE');
      }
      state.stateTS++;
    },
    async APP_TRIGGER({ dispatch }, { name, args, kwargs }) {
      dispatch('WS_TRIGGER', { name, args, kwargs });
    },
    APP_FLUSH_DIRTY_STATE({ getters, dispatch }) {
      if (SHARED_STATE_DIRTY_KEYS.size && !getters.WS_BUSY) {
        const deltaState = [];
        SHARED_STATE_DIRTY_KEYS.forEach((keyName) => {
          deltaState.push({ key: keyName, value: SHARED_STATE[keyName] });
        });
        SHARED_STATE_DIRTY_KEYS.clear();
        dispatch('WS_STATE_UPDATE', deltaState);
      }
    },
    APP_ACTIONS_PROCESSED({ state }) {
      if (state.actions.length) {
        state.actions.length = 0;
      }
    },
  },
};
