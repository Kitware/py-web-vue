import { loadScript, loadCSS } from 'vtk.js/Sources/IO/Core/ResourceLoader';
import Vue from 'vue';
import { fileHandler, fileListHandler, fileInObjectHandler } from '../decorators';

const SHARED_STATE = Object.create(null);
const SHARED_STATE_DIRTY_KEYS = new Set();
const STATE_DECORATORS = [fileHandler, fileListHandler, fileInObjectHandler];

async function loadScriptsSerially(urls) {
  for (let i = 0; i < urls.length; i++) {
    /* eslint-disable no-await-in-loop */
    await loadScript(urls[i]);
  }
}

function get(obj, path) {
  let current = obj;
  const steps = path.split('.');
  for (let i = 0; i < steps.length; i++) {
    current = current[steps[i]];
  }
  return current;
}

async function decorate(value) {
  let result = value;
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < STATE_DECORATORS.length; i++) {
    if (result === null || result === undefined) {
      return result;
    }
    result = await STATE_DECORATORS[i].decorate(result);
  }
  /* eslint-enable no-await-in-loop */
  return result;
}

function compareDecorator(a, b) {
  return a.priority - b.priority;
}

let COMPUTED_MODELS = Object.create(null);

export function generateModels() {
  return COMPUTED_MODELS;
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
    templateTS: 0,
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
    APP_TEMPLATE_TS(state) {
      return state.templateTS;
    },
  },
  mutations: {
    APP_TEMPLATE_SET(state, value) {
      state.mainPageTemplate = value;
    },
    APP_ACTIONS_SET(state, value) {
      state.actions = value;
    },
    APP_TEMPLATE_TS(state) {
      state.templateTS += 1;
    },
  },
  actions: {
    async APP_INIT({ state, dispatch, commit }, serverState) {
      dispatch('WS_STATE_SUBSCRIBE', ([modifiedState]) => {
        Object.assign(SHARED_STATE, modifiedState);
        state.stateTS++;
      });
      dispatch('WS_ACTIONS_SUBSCRIBE', ([actions]) => {
        commit('APP_ACTIONS_SET', actions);
      });
      dispatch('WS_LAYOUT_SUBSCRIBE', ([template]) => {
        commit('APP_TEMPLATE_SET', template);
        // Allow to reprocess elements after the template has updated
        // using the :key="`abc-${tts}`" technique
        setTimeout(() => {
          commit('APP_TEMPLATE_TS');
        }, 10);
      });
      const options = await dispatch('APP_INIT_SET', serverState);
      return options;
    },
    async APP_INIT_SET(
      {
        state, getters, commit, dispatch,
      },
      {
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
      },
    ) {
      let vueOptions = {};
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

      // Export PyWebVue
      COMPUTED_MODELS = await dispatch('APP_UPDATE_COMPUTED_MODELS');
      window.PyWebVue = {
        generateModels,
        get: (key) => getters.APP_GET(key),
        set: (key, value) => dispatch('APP_SET', { key, value }),
        trigger: (mehodName, args = [], kwargs = {}) => dispatch('APP_TRIGGER', { name: mehodName, args, kwargs }),
      };

      // Load exteranl scripts/css
      await Promise.all(styles.map(loadCSS));

      // Load scripts asynchronously unless in serial group
      const serialGroups = {};
      const others = [];
      for (let i = 0; i < scripts.length; i++) {
        let container = others;
        let scriptUrl = scripts[i];
        if (Array.isArray(scriptUrl)) {
          const groupName = scriptUrl[1].serial;
          if (groupName) {
            if (!serialGroups[groupName]) {
              serialGroups[groupName] = [];
            }
            container = serialGroups[groupName];
          }
          [scriptUrl] = scriptUrl;
        }
        container.push(scriptUrl);
      }
      const scriptsPromises = others.map(loadScript);
      const serialScripts = Object.values(serialGroups);
      for (let i = 0; i < serialScripts.length; i++) {
        scriptsPromises.push(loadScriptsSerially(serialScripts[i]));
      }
      await Promise.all(scriptsPromises);

      use.forEach((libUseEntry) => {
        window.get = get;
        let libKey = libUseEntry;
        let libOptions = {};
        if (Array.isArray(libUseEntry)) {
          [libKey, libOptions] = libUseEntry;
        }
        let lib = get(window, libKey);

        // Invalid lib name
        if (!lib) {
          return;
        }

        if (lib.default) {
          lib = lib.default;
        }

        console.log(`Vue.use(${libKey}, ${JSON.stringify(libOptions)}) - ${!!lib} - install(${!!lib.install})`);
        if (lib.install) {
          Vue.use(lib, libOptions);
          if (lib.getOptions) {
            vueOptions = { ...vueOptions, ...lib.getOptions() };
          }
        } else {
          Vue.use({ install: lib }, libOptions);
        }
      });

      // Last update template
      state.mainPageTemplate = layout;
      commit('APP_TEMPLATE_TS');

      return vueOptions;
    },
    APP_SET({ state, dispatch }, { key, value }) {
      SHARED_STATE[key] = value;
      if (state.serverStateKeys.indexOf(key) !== -1) {
        SHARED_STATE_DIRTY_KEYS.add(key);
        dispatch('APP_FLUSH_DIRTY_STATE');
      }
      state.stateTS++;
    },
    APP_SET_ALL({ state, dispatch }, changeSet) {
      let dirtyCount = 0;
      const keys = Object.keys(changeSet);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = changeSet[key];
        SHARED_STATE[key] = value;
        if (state.serverStateKeys.indexOf(key) !== -1) {
          SHARED_STATE_DIRTY_KEYS.add(key);
          dirtyCount++;
        }
      }

      if (dirtyCount) {
        dispatch('APP_FLUSH_DIRTY_STATE');
      }

      state.stateTS++;
    },
    APP_DIRTY({ state, dispatch }, key) {
      if (Array.isArray(key)) {
        for (let i = 0; i < key.length; i++) {
          SHARED_STATE_DIRTY_KEYS.add(key[i]);
        }
      } else {
        SHARED_STATE_DIRTY_KEYS.add(key);
      }

      await dispatch('APP_FLUSH_DIRTY_STATE');
      state.stateTS++;
    },
    async APP_TRIGGER({ dispatch }, { name, args, kwargs }) {
      let decoratedArgs;
      let decoratedKwargs;

      if (args) {
        const decorateArgs = args.map((arg) => decorate(arg));
        decoratedArgs = await Promise.all(decorateArgs);
      }

      if (kwargs) {
        const decorateKwargs = Object.values(kwargs).map((val) => decorate(val));
        const kwargsKeys = Object.keys(kwargs);

        const decoratedKwargsValues = await Promise.all(decorateKwargs);
        decoratedKwargs = kwargsKeys.reduce((tot, key, i) => (
          { ...tot, [key]: decoratedKwargsValues[i] }
        ), {});
      }

      await dispatch('WS_TRIGGER', { name, args: decoratedArgs, kwargs: decoratedKwargs });
    },
    async APP_FLUSH_DIRTY_STATE({ getters, dispatch }) {
      if (SHARED_STATE_DIRTY_KEYS.size && !getters.WS_BUSY) {
        const waitOn = [];
        const keys = [];
        SHARED_STATE_DIRTY_KEYS.forEach((keyName) => {
          waitOn.push(decorate(SHARED_STATE[keyName]));
          keys.push(keyName);
        });
        SHARED_STATE_DIRTY_KEYS.clear();
        const values = await Promise.all(waitOn);
        const deltaState = keys.map((key, i) => ({ key, value: values[i] }));
        dispatch('WS_STATE_UPDATE', deltaState);
      }
    },
    APP_ACTIONS_PROCESSED({ state }) {
      if (state.actions.length) {
        state.actions.length = 0;
      }
    },
    APP_UPDATE_COMPUTED_MODELS({ getters, dispatch }) {
      const computed = {};

      // Get state keys
      const keys = Object.keys(SHARED_STATE);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        computed[key] = {
          get() {
            return getters.APP_GET(key);
          },
          set(value) {
            dispatch('APP_SET', { key, value });
          },
        };
      }

      // Get wsBusy
      computed.busy = () => getters.WS_BUSY;

      return computed;
    },
    APP_REGISTER_DECORATOR(ctx, decorator) {
      STATE_DECORATORS.push(decorator);
      STATE_DECORATORS.sort(compareDecorator);
    },
  },
};
