/* global __dirname */
"use strict";
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var lodashPath = path.resolve(__dirname, './node_modules/lodash/lodash.js')

module.exports = {
  entry: {
    'angular2': [
      'rxjs',
      'reflect-metadata',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': './app/main'
  },
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.jade'],
    alias: {
      lodash: lodashPath
    }
  },
  externals: ['ws'],
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new CommonsChunkPlugin({
      name: 'angular2',
      filename: 'angular2.js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    })
  ],
  module: {
    loaders: [{
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
    }]
  }
};
