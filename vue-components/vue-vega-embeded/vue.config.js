const path = require('path');
const MODULES = "../../python/src/pywebvue/modules"
const VegaEmbed = "VegaEmbed/serve"

module.exports = {
  outputDir: path.resolve(__dirname, MODULES, VegaEmbed),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: ['vega-lite', 'vega'],
};
