var express = require('express');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('./webpack.config.js');
const PORT = process.env.PORT || 8001;


if (process.env.NODE_ENV === 'development') {

  var compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }); 

} else if (process.env.NODE_ENV === 'production') {

  var server = express();
  server.use('/', express.static(`${__dirname}/build`));
}

server.listen(PORT, "0.0.0.0", ()=> {
    console.log(`ENV=${process.env.NODE_ENV} - Listening on ${PORT}`);
});