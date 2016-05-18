var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    entry: "./app/main.js",
    output: {
        path: `${__dirname}/build`,
        publicPath: '/',
        filename: 'bundle.js',
        sourceMapFilename: '[name].js.map',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loaders: [
                "file?hash=sha512&digest=hex&name=[hash].[ext]",
                "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
            ]
        }, { 
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'html-loader!./app/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: false
        })
   ],
};


    