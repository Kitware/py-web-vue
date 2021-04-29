export default (session) => ({
  init() {
    return session.call('ws.vue.init', []);
  },
  trigger(name, args = [], kwargs = {}) {
    return session.call('ws.vue.trigger', [name, args, kwargs]);
  },
  updateState(changes) {
    return session.call('ws.vue.state.update', [changes]);
  },
  subscribeToStateUpdate(callback) {
    return session.subscribe('topic.ws.vue.state', callback);
  },
  subscribeToActions(callback) {
    return session.subscribe('topic.ws.vue.actions', callback);
  },
  subscribeToLayout(callback) {
    return session.subscribe('topic.ws.vue.layout', callback);
  },
  subscribeToRoutes(callback) {
    return session.subscribe('topic.ws.vue.routes', callback);
  },
  unsubscribe(subscription) {
    return session.unsubscribe(subscription);
  },
});
