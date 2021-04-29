export default (session) => ({
  getArray(hash, binary = true) {
    return session.call('viewport.geometry.array.get', [hash, binary]);
  },
  getViewState(viewId, newSubscription = false) {
    return session.call('viewport.geometry.view.get.state', [viewId, newSubscription]);
  },
  addViewObserver(viewId) {
    return session.call('viewport.geometry.view.observer.add', [viewId]);
  },
  removeViewObserver(viewId) {
    return session.call('viewport.geometry.view.observer.remove', [viewId]);
  },
  subscribeToViewChange(callback) {
    return session.subscribe('viewport.geometry.view.subscription', callback);
  },
  unsubscribe(subscription) {
    return session.unsubscribe(subscription);
  },
});
