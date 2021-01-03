const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../public/packs'),
    publicPath: '/packs/',
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true
    }),
    new CleanWebpackPlugin()
  ],
});
