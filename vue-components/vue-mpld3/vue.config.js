const path = require('path');
const DST_PATH = 'python/src/pywebvue/modules/Matplotlib/serve';

module.exports = {
  outputDir: path.resolve(__dirname, '../..', DST_PATH),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: [],
  chainWebpack: (config) => {
    config.externals({ mpld3: 'mpld3' });
  },
};
