const path = require('path');
const MODULES = "../../python/src/pywebvue/modules"
const Deck = "Deck/serve"

module.exports = {
  outputDir: path.resolve(__dirname, MODULES, Deck),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: ['vega-lite', 'vega'],
};
