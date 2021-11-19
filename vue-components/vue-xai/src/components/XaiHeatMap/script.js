import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';

import { getPixels } from '../../utils/canvasHelper';

export default {
  name: 'XaiHeatMap',
  props: {
    heatmap: {
      type: [
        Array,
        Float32Array,
        Float64Array,
        Uint8Array,
        Uint16Array,
        Uint32Array,
        Int8Array,
        Int16Array,
        Int32Array,
      ],
      default: () => [],
    },
    shape: {
      type: Array,
      default: () => [10, 10],
    },
    colorMode: {
      type: String,
      default: 'full',
    },
    colorRange: {
      type: Array,
      default: () => [-1, 1],
    },
    colorPreset: {
      type: String,
      default: 'erdc_rainbow_bright',
    },
  },
  computed: {
    width() {
      return this.shape[0];
    },
    height() {
      return this.shape[1];
    },
    fullRange() {
      let min = this.heatmap[0];
      let max = this.heatmap[0];
      for (let i = 0; i < this.heatmap.length; i++) {
        const v = this.heatmap[i];
        if (min > v) {
          min = v;
        }
        if (max < v) {
          max = v;
        }
      }
      return [min, max];
    },
    maxSymRange() {
      const [min, max] = this.fullRange;
      const value = Math.max(-min, max);
      return [-value, value];
    },
    minSymRange() {
      const [min, max] = this.fullRange;
      const value = Math.min(-min, max);
      return [-value, value];
    },
    positiveRange() {
      const [, max] = this.fullRange;
      return [0, max];
    },
    negativeRange() {
      const [min] = this.fullRange;
      return [min, 0];
    },
    colorRangeToUse() {
      switch (this.colorMode) {
        case 'full':
          return this.fullRange;
        case 'maxSym':
          return this.maxSymRange;
        case 'minSym':
          return this.minSymRange;
        case 'positive':
          return this.positiveRange;
        case 'negative':
          return this.negativeRange;
        case 'custom':
          return this.colorRange;
        default:
          return this.fullRange;
      }
    },
  },
  watch: {
    shape() {
      this.$nextTick(this.render);
    },
    heatmap() {
      this.$nextTick(this.render);
    },
    colorPreset() {
      this.lut.applyColorMap(vtkColorMaps.getPresetByName(this.colorPreset));
      this.$nextTick(this.render);
    },
    colorRangeToUse() {
      this.$nextTick(this.render);
    },
  },
  mounted() {
    this.$nextTick(this.render);
  },
  methods: {
    render() {
      const [min, max] = this.colorRangeToUse;
      if (!this.width || !this.height || !(max - min) || !this.heatmap) {
        return;
      }

      this.lut.setMappingRange(min, max);
      this.lut.updateRange();

      if (!this.width || !this.height) {
        return;
      }

      const rawPixels = getPixels(
        this.width,
        this.height,
        this.heatmap,
        this.toColor
      );
      const ctx = this.$el.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.putImageData(rawPixels, 0, 0);
    },
    onMouseMove(e) {
      const { clientX, clientY } = e;
      const { top, left, width, height } = this.bounds;
      const xNorm = (clientX - left) / width;
      const yNorm = 1 - (clientY - top) / height;
      const i = Math.round(xNorm * (this.width - 1));
      const j = Math.round(yNorm * (this.height - 1));
      this.$emit('hover', { i, j });
    },
    onMouseEnter() {
      this.$emit('enter');
      this.bounds = this.$el.getBoundingClientRect();
    },
  },
  created() {
    this.lut = vtkColorTransferFunction.newInstance();
    this.lut.applyColorMap(vtkColorMaps.getPresetByName(this.colorPreset));

    const color = [0, 0, 0, 255];
    this.toColor = (v) => {
      this.lut.getColor(v, color);
      color[0] *= 255;
      color[1] *= 255;
      color[2] *= 255;
      return color;
    };
  },
};
