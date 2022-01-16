import { Plotly } from 'vue-plotly';

function safeObject(item) {
  const newItem = {};
  const keys = Object.keys(item);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === 'data') {
      continue;
    }
    const value = item[key];
    if (Array.isArray(value)) {
      newItem[key] = value.map(safeObject);
    } else {
      try {
        JSON.stringify(value);
        newItem[key] = value;
      } catch (e) {
        continue;
      }
    }
  }
  return newItem;
}

function safeEvent(event) {
  const safe = safeObject(event);
  safe.data = event?.points[0]?.data;
  return safe;
}

export default {
  install(Vue) {
    Vue.component('Plotly', Plotly);
    window.VuePlotly.safe = safeEvent;
  },
};
