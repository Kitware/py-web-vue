import mpld3 from 'mpld3';

export default {
  name: 'Matplotlib',
  props: {
    name: {
      type: String,
    },
    spec: {
      type: Object,
    },
  },
  computed: {
    figureId() {
      return `mpld3_fig_${this.name}`;
    },
  },
  watch: {
    spec() {
      this.drawFigure(true);
    },
  },
  methods: {
    drawFigure(clearElem = false) {
      if (this.spec) {
        mpld3.draw_figure(this.figureId, this.spec, null, clearElem);
      } else {
        mpld3.remove_figure(this.figureId);
      }
    },
  },
  mounted() {
    if (this.spec) {
      this.drawFigure();
    }
  },
  beforeDestroy() {
    mpld3.remove_figure(this.figureId);
  },
};
