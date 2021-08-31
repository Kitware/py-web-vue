export default {
  name: 'Trigger',
  methods: {
    emit(topic, event) {
      this.$emit(topic, event);
    },
  },
};
