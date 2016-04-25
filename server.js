var express = require('express');
const PORT = process.env.PORT || 3001;

var app = express();
app.use('/', express.static(__dirname + '/build'));

app.listen(PORT, ()=> {
  console.log(`Listening on ${PORT}`);
});
