var express        = require('express');

var app            = express();

// require our routes/users.js file 
var todoApiRoute = require("./routes/todo");


// First example router
app.get('/', function(req, res) {
  res.send("Welcome to todo application");
});

app.use('/v1/todo', todoApiRoute);

app.listen(8080);
console.log('Magic happens on port 8080'); 			// shoutout to the user
