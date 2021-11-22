import XaiHeatMap from '../XaiHeatMap';

export default {
  name: 'XaiImage',
  components: {
    XaiHeatMap,
  },
  props: {
    // Image handling
    src: {
      type: String,
    },
    maxHeight: {
      type: [String, Number],
    },
    maxWidth: {
      type: [String, Number],
    },
    width: {
      type: String,
    },
    // Areas handling (object detection)
    colors: {
      type: Array,
      default() {
        return ['#e1002a', '#417dc0', '#1d9a57', '#e9bc2f', '#9b3880'];
      },
    },
    areas: {
      type: Array,
    },
    areaKey: {
      type: String,
      default: 'name',
    },
    areaStyle: {
      type: Object,
      default() {
        return {
          'stroke-width': 3,
          rx: 10,
        };
      },
    },
    areaSelected: {
      type: Array,
    },
    areaSelectedOpacity: {
      type: [Number, String],
    },
    areaOpacity: {
      type: [Number, String],
    },
    // Heatmap handling
    heatmaps: {
      type: Object,
    },
    heatmapOpacity: {
      type: [String, Number],
    },
    heatmapColorPreset: {
      type: [String, Object],
      default: 'rainbow',
    },
    heatmapColorRange: {
      type: Array,
    },
    heatmapActive: {
      type: String,
    },
    heatmapColorMode: {
      type: String,
      default: 'full',
    },
  },
  data() {
    return {
      imageWidth: 0,
      imageHeight: 0,
      containerStyle: {
        position: 'relative',
      },
      imageStyle: {
        position: 'relative',
      },
      annotationStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      areaSelectedOpacityValue: 1,
      areaOpacityValue: 1,
      selectedAreas: {},
    };
  },
  watch: {
    src(url) {
      this.image.src = url;
    },
    maxWidth() {
      this.updateSizes();
    },
    maxHeight() {
      this.updateSizes();
    },
  },
  computed: {
    decoratedAreas() {
      this.areaSelected;
      const so = this.areaSelectedOpacity ?? this.areaSelectedOpacityValue;
      const o = this.areaOpacity ?? this.areaOpacityValue;
      return this.areas.map((item, idx) => ({
        ...item,
        opacity: this.isAreaSelected(idx) ? so : o,
        color: this.colors[idx % this.colors.length],
      }));
    },
    activeHeatmap() {
      return this.heatmaps && this.heatmaps[this.heatmapActive];
    },
    heatMapStyle() {
      return { ...this.annotationStyle, opacity: this.heatmapOpacity };
    },
    shape() {
      return [this.imageWidth, this.imageHeight];
    },
  },
  methods: {
    updateSizes() {
      this.imageStyle.height = 'auto';
      this.imageStyle.width = 'auto';

      if (this.maxHeight) {
        this.imageStyle.maxHeight = `${this.maxHeight}px`;
        this.annotationStyle.maxHeight = `${this.maxHeight}px`;
      } else {
        delete this.imageStyle.maxHeight;
        delete this.annotationStyle.maxHeight;
      }

      if (this.maxWidth) {
        this.imageStyle.maxWidth = `${this.maxWidth}px`;
        this.annotationStyle.maxWidth = `${this.maxWidth}px`;
      } else {
        this.imageStyle.maxWidth = '100%';
        this.annotationStyle.maxWidth = '100%';
      }

      if (this.width) {
        this.containerStyle.width = this.width;
        this.imageStyle.width = this.width;
        this.annotationStyle.width = this.width;
      } else {
        delete this.containerStyle.width;
        delete this.annotationStyle.width;
      }
    },
    isAreaSelected(idx) {
      const selection = this.areas[idx][this.areaKey];
      if (!this.areaSelected) {
        return false;
      }
      return !!this.areaSelected.find((item) => selection == item);
    },
    updateAreaSelection(idx, selected) {
      const selection = this.areas[idx];
      this.selectedAreas[selection[this.areaKey]] = selected;
      const array = [];
      for (let i = 0; i < this.areas.length; i++) {
        const key = this.areas[i][this.areaKey];
        if (this.selectedAreas[key]) {
          array.push(key);
        }
      }
      this.$emit('areaSelectionChange', array);
    },
  },
  created() {
    // callback
    this.updateImageSize = () => {
      this.imageWidth = this.image.width;
      this.imageHeight = this.image.height;
    };

    this.image = new Image();
    this.image.addEventListener('load', this.updateImageSize);

    // Load image
    this.image.src = this.src;
    this.updateSizes();
  },
  mounted() {},
  beforeDestroy() {
    this.image.removeEventListener('load', this.updateImageSize);
  },
};
