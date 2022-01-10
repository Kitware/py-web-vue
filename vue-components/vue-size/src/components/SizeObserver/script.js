export default {
  name: 'SizeObserver',
  props: {
    name: {
      type: String,
    },
  },
  created() {
    this.observer = new ResizeObserver(() => {
      if (!this.name || !this.$el) {
        return;
      }
      const size = this.$el.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio;
      const dpi = 96 * pixelRatio;
      this.set(this.name, { name: this.name, size, pixelRatio, dpi });
    });
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    this.observer.unobserve(this.$el);
  },
  inject: ['set', 'get'],
};
