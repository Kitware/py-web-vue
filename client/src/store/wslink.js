import SmartConnect from 'wslink/src/SmartConnect';
import vtkWSLinkClient from 'vtk.js/Sources/IO/Core/WSLinkClient';
import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import protocols from '../protocols';
import { setAddAttachment } from '../decorators';

vtkWSLinkClient.setSmartConnectClass(SmartConnect);

// Process arguments from URL
const userParams = vtkURLExtract.extractURLParameters();

/* eslint-disable no-param-reassign */
function configDecorator(config) {
  if (userParams.dev) {
    config.sessionURL = `ws://${window.location.hostname}:1234/ws`; // Configured to work on seperate server
  }
  // If name is provided we use it as our application and
  // expand any other url params into our config.
  if (userParams.name) {
    config.application = userParams.name;
    return { ...config, ...userParams };
  }
  return config;
}
/* eslint-enable no-param-reassign */

const SUBSCRIPTIONS = {};

export default {
  state: {
    busy: 0,
    config: {
      application: 'PyWebVue',
    },
    client: null,
  },
  getters: {
    WS_CONFIG(state) {
      return state.config;
    },
    WS_CLIENT(state) {
      return state.client;
    },
    WS_BUSY(state) {
      return !!state.busy;
    },
  },
  mutations: {
    WS_CONFIG_SET(state, value) {
      state.config = value;
    },
    WS_CLIENT_SET(state, value) {
      state.client = value;
    },
  },
  actions: {
    // ------------------------------------------------------------------------
    // WS initialization
    // ------------------------------------------------------------------------
    async WS_CONNECT({
      state, getters, commit, dispatch,
    }) {
      const client = vtkWSLinkClient.newInstance({ protocols });

      client.onBusyChange((count) => {
        state.busy = count;

        if (count === 0) {
          dispatch('APP_FLUSH_DIRTY_STATE');
        }
      });

      // Connect hooks on ws connection
      client.onConnectionError((httpReq) => {
        const message = (httpReq && httpReq.response && httpReq.response.error)
          || 'Connection error';
        commit('APP_TEMPLATE_SET', `<vtk-loading message="${message}"/>`);
      });

      client.onConnectionClose((httpReq) => {
        const message = (httpReq && httpReq.response && httpReq.response.error)
          || 'Connection close';
        commit('APP_TEMPLATE_SET', `<vtk-loading message="${message}"/>`);
      });

      await client.connect(configDecorator(getters.WS_CONFIG));

      // Capture ws client in the store
      commit('WS_CLIENT_SET', client);
      setAddAttachment(client.getConnection().getSession().addAttachment);

      return client;
    },
    // ------------------------------------------------------------------------
    // GemPy
    // ------------------------------------------------------------------------
    async WS_INIT({ state }) {
      return state.client
        .getRemote()
        .PyWebVue.init()
        .catch(console.error);
    },
    async WS_TRIGGER({ state }, { name, args, kwargs }) {
      return state.client
        .getRemote()
        .PyWebVue.trigger(name, args, kwargs)
        .catch(console.error);
    },
    async WS_STATE_UPDATE({ state }, changes) {
      return state.client
        .getRemote()
        .PyWebVue.updateState(changes)
        .catch(console.error);
    },
    async WS_STATE_SUBSCRIBE({ state, dispatch }, callback) {
      await dispatch('WS_STATE_UNSUBSCRIBE');
      SUBSCRIPTIONS.state = state.client
        .getRemote()
        .PyWebVue.subscribeToStateUpdate(callback)
        .catch(console.error);
    },
    async WS_ACTIONS_SUBSCRIBE({ state, dispatch }, callback) {
      await dispatch('WS_ACTIONS_UNSUBSCRIBE');
      SUBSCRIPTIONS.actions = state.client
        .getRemote()
        .PyWebVue.subscribeToActions(callback)
        .catch(console.error);
    },
    async WS_LAYOUT_SUBSCRIBE({ state, dispatch }, callback) {
      await dispatch('WS_LAYOUT_UNSUBSCRIBE');
      SUBSCRIPTIONS.layout = state.client
        .getRemote()
        .PyWebVue.subscribeToLayout(callback)
        .catch(console.error);
    },
    async WS_ROUTES_SUBSCRIBE({ state, dispatch }, callback) {
      await dispatch('WS_ROUTES_UNSUBSCRIBE');
      SUBSCRIPTIONS.routes = state.client
        .getRemote()
        .PyWebVue.subscribeToRoutes(callback)
        .catch(console.error);
    },
    async WS_UNSUBSCRIBE({ state }, key) {
      if (SUBSCRIPTIONS[key]) {
        state.client
          .getRemote()
          .PyWebVue.unsubscribe(SUBSCRIPTIONS[key])
          .catch(console.error);
        SUBSCRIPTIONS[key] = null;
      }
    },
    async WS_STATE_UNSUBSCRIBE({ dispatch }) {
      dispatch('WS_UNSUBSCRIBE', 'state');
    },
    async WS_ACTIONS_UNSUBSCRIBE({ dispatch }) {
      dispatch('WS_UNSUBSCRIBE', 'actions');
    },
    async WS_LAYOUT_UNSUBSCRIBE({ dispatch }) {
      dispatch('WS_UNSUBSCRIBE', 'layout');
    },
    async WS_ROUTES_UNSUBSCRIBE({ dispatch }) {
      dispatch('WS_UNSUBSCRIBE', 'routes');
    },
  },
};
