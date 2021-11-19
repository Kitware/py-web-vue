import XaiImage from '../../components/XaiImage';

export default {
  name: 'XAI',
  props: {},
  components: {
    XaiImage,
  },
  data() {
    return {
      image:
        'https://media.istockphoto.com/photos/close-up-scottish-fold-cat-head-with-shocking-face-and-wide-open-eyes-picture-id1128004359',
      areaSelected: [],
      areas: [
        {
          name: 'cat',
          area: [320, 210, 380, 341],
        },
        {
          name: 'left-eye',
          area: [428, 325, 70, 60],
        },
        {
          name: 'right-eye',
          area: [555, 325, 70, 60],
        },
        {
          name: 'nose',
          area: [510, 400, 60, 60],
        },
        {
          name: 'left-ear',
          area: [345, 220, 100, 100],
        },
        {
          name: 'right-ear',
          area: [575, 220, 95, 90],
        },
      ],
      areaStyle: {
        'stroke-width': 10,
        rx: 50,
      },
      heatmapOpacity: 0.2,
      heatmapColorPreset: 'Cool to Warm (Extended)',
      heatMaps: {},
      heatmapActive: 'map1',
      heatmapColorMode: 'full',
    };
  },
  methods: {
    computeHeatMap() {
      const size = 1024 * 683;
      const array = new Float32Array(size);
      for (let i = 0; i < size; i++) {
        array[i] = Math.random() * 2 - 0.5;
      }
      return array;
    },
    updateSelection(selection) {
      console.log('reset selection');
      this.areaSelected = selection;
    },
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.heatMaps[`map${i + 1}`] = this.computeHeatMap();
    }
  },
};
