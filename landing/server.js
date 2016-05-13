var express = require('express');
const PORT = process.env.PORT || 8001;

var app = express();
app.use('/', express.static(`${__dirname}/app`));

app.listen(PORT, ()=> {
  console.log(`Listening on ${PORT}`);
});
