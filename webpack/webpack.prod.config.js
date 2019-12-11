/* eslint-disable */
const merge = require('webpack-merge');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Configs
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
  return merge([
    {
      devtool: '',
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: -10,
              reuseExistingChunk: true
            }
          }
        },
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin()
      ]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
