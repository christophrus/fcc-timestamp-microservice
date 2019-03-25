// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});


app.get("/api/timestamp/:date_string?", function (req, res) {

  let {
    date_string
  } = req.params;
  let ret;
  let date;
  
  console.log(date_string);

  if (date_string === undefined) {
    
    date = new Date();
  } else {

    if (isNaN(Date.parse(date_string))) {

      date = new Date(parseInt(date_string));
    } else {

      date = new Date(date_string);
    }
  }

  if (isNaN(date)) {

    ret = {
      error: "invalid date"
    }
  } else {

    ret = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  }

  res.json(ret);


})


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});