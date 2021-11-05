export default {
  name: 'Trigger',
  methods: {
    emit(topic, event) {
      this.$emit(topic, event);
    },
  },
  created() {
    this.emit('created');
  },
  mounted() {
    this.emit('mounted');
  },
  beforeUnmount() {
    this.emit('beforeUnmount');
  },
};
