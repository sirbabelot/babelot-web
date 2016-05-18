/* global __dirname */
"use strict";
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var BABLOT_API_URL = process.env.BABLOT_API_URL;
console.log(BABLOT_API_URL);

module.exports = {
  entry: {
    'polyfills': [
      'es6-shim/es6-shim.js',
      'angular2/bundles/angular2-polyfills'
    ],
    'vendor': [
      'bootstrap',
      'spin.js/spin.js'
    ],
    'angular2': [
      'rxjs',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': './app/main'
  },
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  },
  externals: ['ws'],
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: `imports?BABLOT_API_URL=>'${BABLOT_API_URL}'`
    },{
      test: /\.ts$/,
      loader: 'ts-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.jade$/,
      loader: 'apply!jade-loader'
    }, {
      test: /\.sass$/,
      loader: "style!css-loader!sass-loader?indentedSyntax=true"
    }, {
      test: /\.scss$/,
      loader: "style!css!sass-loader?indentedSyntax=false"
    }, {
      test: /node_modules\/auth0-lock\/.*\.js$/,
      loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify'
      ]
    }, {
      test: /node_modules\/auth0-lock\/.*\.ejs$/,
      loader: 'transform-loader/cacheable?ejsify'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9]|2)?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  }
};
