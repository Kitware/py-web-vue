export default {
  name: 'StateUpdate',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  watch: {
    value(current) {
      this.$nextTick(() => {
        this.$emit('change', current);
      });
    },
  },
};
