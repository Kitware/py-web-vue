import embed from 'vega-embed';

export default {
  name: 'VegaEmbed',
  props: {
    spec: {
      type: Object,
    },
    opt: {
      type: Object,
      default() {
        return { actions: false };
      },
    },
  },
  watch: {
    async spec() {
      await this.mountVis();
    },
    async opt() {
      await this.mountVis();
    },
  },
  methods: {
    async mountVis() {
      this.unmoutViz();
      if (this.spec) {
        this.viz = await embed(this.$el, this.spec, this.opt);
      }
    },
    unmoutViz() {
      if (this.viz) {
        this.viz.finalize();
        this.viz = null;
      }
    },
  },
  async mounted() {
    await this.mountVis();
  },
  beforeDestroy() {
    this.unmoutViz();
  },
};
