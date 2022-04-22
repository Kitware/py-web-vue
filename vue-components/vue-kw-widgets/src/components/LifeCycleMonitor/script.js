export default {
  name: 'TrameLifeCycleMonitor',
  props: {
    name: {
      type: String,
      default: 'TrameLifeCycleMonitor',
    },
    type: {
      type: String,
      default: 'error',
    },
    value: {
      type: String,
      default: 'value',
    },
  },
  beforeCreate() {
    console.error('TrameLifeCycleMonitor: beforeCreate');
  },
  created() {
    console[this.type](this.name, 'created', this.value);
  },
  beforeMount() {
    console[this.type](this.name, 'beforeMount', this.value);
  },
  mounted() {
    console[this.type](this.name, 'mounted', this.value);
  },
  beforeUpdate() {
    console[this.type](this.name, 'beforeUpdate', this.value);
  },
  updated() {
    console[this.type](this.name, 'updated', this.value);
  },
  beforeDestroy() {
    console[this.type](this.name, 'beforeDestroy', this.value);
  },
  destroyed() {
    console[this.type](this.name, 'destroyed', this.value);
  },
};
