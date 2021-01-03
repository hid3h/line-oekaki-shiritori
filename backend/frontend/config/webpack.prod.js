const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv         = require('dotenv-webpack');
const path           = require('path');

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

    // https://webpack.js.org/plugins/environment-plugin/#dotenvplugin
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    })
  ],
});
