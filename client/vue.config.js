const path = require('path');
const vtkChainWebpack = require('vtk.js/Utilities/config/chainWebpack');

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  outputDir: path.resolve(__dirname, '../python/src/pywebvue/www'),
  chainWebpack: (config) => {
    // Add vtk.js rules
    vtkChainWebpack(config);
  },
};
