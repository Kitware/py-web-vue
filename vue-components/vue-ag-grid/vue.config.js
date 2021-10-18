const path = require('path');
const MODULES = "../../python/src/pywebvue/modules"
const AGGrid = "AGGrid/serve"

module.exports = {
  outputDir: path.resolve(__dirname, MODULES, AGGrid),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: [],
};
