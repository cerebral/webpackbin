'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackbinEnv = process.env.WEBPACKBIN_ENV || 'webpackbin-dev';

/*
 LOADERS
 */
const rules = [
  (
  isProduction ?
      {test: /\.css$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
      })}
    :
      {test: /\.css$/, use: [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {modules: true}}
      ]}
  ),
  {test: /\.woff/, use: [{loader: 'url-loader'}]},  {
    test: /\.js?$/,
    include: [
      path.resolve('src')
    ],
    use: [{
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('babel-preset-es2015')
        ],
        plugins: [
          'syntax-dynamic-import',
          'inferno',
          'transform-object-rest-spread'
        ]
      }
    }]
  }
];

/*
 PLUGINS
 */
let plugins = [
  new HtmlWebpackPlugin({
    title: 'Ducky',
    language: 'no',
    isProduction: isProduction,
    template: path.resolve('index.template.html'),
    inject: true,
    chunksSortMode: 'dependency'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
      WEBPACKBIN_ENV: JSON.stringify(webpackbinEnv)
    }
  })
];

if (isProduction && process.argv[4] !== '--analyzer') {
  plugins = plugins.concat([
    new webpack.HashedModuleIdsPlugin(),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'manifest']
    })
  ]);
}

if (process.argv[4] === '--analyzer') {
  plugins = plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common']
    }),
    new BundleAnalyzerPlugin(),
    new ExtractTextPlugin('[name].css')
  ]);
}

if (isProduction) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['webpackJsonp'],
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]);
}

/*
 VENDORS
 */
const common = [
  'inferno',
  'inferno-component',
  'inferno-create-element',
  'cerebral',
  'cerebral-router',
  'cerebral-provider-http',
  'cerebral-provider-firebase',
  'cerebral-module-useragent',
  'classnames',
  'firebase'
];

/*
 CONFIG
 */
module.exports = {
  target: 'web',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  performance: {
    hints: isProduction ? 'warning' : false
  },
  entry: {
    main: path.resolve('src', 'main.js'),
    common: common
  },
  output: {
    path: path.resolve('public'),
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[chunkhash].js' : '[id].js',
    publicPath: '/'
  },
  devServer: isProduction ? {} : {
    port: 3000,
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only'
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    alias: {
      common: path.resolve('src', 'common'),
      components: path.resolve('src', 'components'),
      modules: path.resolve('src', 'modules'),
      computed: path.resolve('src', 'computed'),
      config: path.resolve('configs', `${webpackbinEnv}.json`),
      utils: path.resolve('src', 'utils')
    }
  },
  module: {
    rules: rules
  },
  plugins: plugins
};
