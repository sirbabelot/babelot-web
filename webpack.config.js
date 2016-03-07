"use strict";
let webpack = require('webpack');
let path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const lodashPath = path.resolve(__dirname, './node_modules/lodash/lodash.js')

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
        }]
    }
};