/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { ENVIRONMENT, ROLE } = env;

  return merge([
    {
      watchOptions: {
        ignored: ['public', 'node_modules'],
        aggregateTimeout: 300,
        poll: 1000
      },

      entry: ['@babel/polyfill', `${APP_DIR}/index-${ROLE}.tsx`],

      output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },

      // Enable sourcemaps for debugging webpack's output.
      devtool: 'source-map',

      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        mainFields: ['browser', 'main', 'module'],
        plugins: [new TsConfigPathsPlugin()]
      },
      module: {
        rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader'
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: [path.join(process.cwd(), 'node_modules')]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader'
              }
            ]
          },
          {
            test: /\.(scss|css)$/,
            use: [
              ENVIRONMENT === 'dev'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: ENVIRONMENT === 'dev' }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: ENVIRONMENT === 'dev' }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: ENVIRONMENT === 'dev' }
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  sourceMap: ENVIRONMENT === 'dev',
                  resources: [
                    'src/scss/config/_variables.scss',
                    'src/scss/config/_mixins.scss'
                  ]
                }
              }
            ]
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/fonts/'
                }
              }
            ]
          },
          {
            test: /\.(ico|png|jpg|jpeg|gif)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './'
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html',
          chunksSortMode: 'none',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }),
        new webpack.DefinePlugin({
          'process.env.ENVIRONMENT': JSON.stringify(ENVIRONMENT)
        }),
        new CopyWebpackPlugin([{ from: 'src/assets' }, { from: 'public' }]),
        new Dotenv({
          path: ENVIRONMENT ? `.env.${ENVIRONMENT}` : `.env.dev`
        })
      ]
    }
  ]);
};
