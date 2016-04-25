var express = require('express');
const PORT = process.env.PORT || 3001;

var app = express();
app.use('/build', express.static(__dirname + '/build'));

app.get('/', (req, res)=> {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, ()=> {
  console.log(`Listening on ${PORT}`);
});
