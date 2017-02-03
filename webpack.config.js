'use strict';

const path = require('path');
const username = require('username');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const duckyEnv = process.env.DUCKY_ENV;

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
  {test: /\.svg/, use: [{loader: 'url-loader'}, {
    loader: 'svgo-loader', options: {
      plugins: [
        {removeTitle: true},
        {convertColors: {shorthex: false}},
        {convertPathData: false}
      ]
    }
  }]},
  {test: /\.png/, use: [{loader: 'url-loader', options: {limit: 1000}}]},
  {test: /\.jpg/, use: [{loader: 'url-loader', options: {limit: 1000}}]},
  {test: /\.woff/, use: [{loader: 'url-loader'}]},
  {test: /\.json/, use: [{loader: 'json-loader'}]},
  {
    test: /\.js?$/,
    include: [
      path.resolve('client'),
      path.resolve('utils'),
      isProduction ? path.resolve('node_modules', 'ducky-components', 'src') : path.resolve('..', 'ducky-components', 'src'),
      path.resolve('calculator'),
      path.resolve('resources/languages')
    ],
    use: [{
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('babel-preset-es2015'),
          require.resolve('babel-preset-react'),
          require.resolve('babel-preset-stage-0')
        ],
        plugins: ['syntax-dynamic-import']
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
      DUCKY_ENV: JSON.stringify(duckyEnv),
      TASK_PREFIX: JSON.stringify(isProduction ? '' : username.sync())
    }
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
];

if (isProduction && process.argv[6] !== '--analyzer') {
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

if (process.argv[6] === '--analyzer') {
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
  'react',
  'react-dom',
  'react-date-picker',
  'moment',
  'cerebral',
  'cerebral-router',
  'cerebral-forms',
  'cerebral-provider-http',
  'cerebral-provider-firebase',
  'cerebral-module-useragent',
  'classnames',
  'firebase',
  'd3',
  'rc-tooltip',
  path.resolve('client', 'common', 'activityIcons.js')
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
    main: [path.resolve('client', 'ieSucksPolyfill.js'), path.resolve('client', 'main.js')],
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
      dc: isProduction ? 'ducky-components' : path.resolve('..', 'ducky-components'),
      common: path.resolve('client', 'common'),
      modules: path.resolve('client', 'modules'),
      computed: path.resolve('client', 'computed'),
      language: path.resolve('resources', 'languages', 'no', 'index.js'),
      resources: path.resolve('resources'),
      text: path.resolve('client', 'text.js'),
      images: path.resolve('public', 'images'),
      config: path.resolve('configs', `client-${duckyEnv}.json`),
      utils: path.resolve('utils'),
      calculator: path.resolve('calculator')
    }
  },
  module: {
    rules: rules
  },
  plugins: plugins
};
