const path = require('path');
const MODULES = '../../python/src/pywebvue/modules';
const Widgets = 'Widgets/serve';

module.exports = {
  outputDir: path.resolve(__dirname, MODULES, Widgets),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: [],
};
