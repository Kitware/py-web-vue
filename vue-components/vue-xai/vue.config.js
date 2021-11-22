const path = require('path');
const MODULES = '../../python/src/pywebvue/modules';
const Xai = 'Xai/serve';

module.exports = {
  outputDir: path.resolve(__dirname, MODULES, Xai),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: [],
};
