// load the things we need
var express = require('express');
var app = express();
var axios = require('axios');

// set the view engine to ejs
app.set('view engine', 'ejs');

// // use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    console.log("request started");
	res.render('pages/index');
});

app.get('/:id', function(req, res) {
    console.log(req.params.id);
    axios.get('https://api.github.com/users/' +req.params.id + '/repos')
  .then(function (response) {
    res.render('pages/result',{
        response:response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.listen(8080);
console.log('8080 is the magic port');