const ManifestPlugin = require('webpack-manifest-plugin');

const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../public/packs'),
    publicPath: '/packs/',
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
    }),
  ],
});
