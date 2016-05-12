var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('./webpack.config.js');

var compiler = webpack(config);
console.log(config);
console.log(compiler);

var server = new WebpackDevServer(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});

server.listen(8000, "0.0.0.0", function() {});