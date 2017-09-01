// load the things we need
var express = require('express');
var app = express();
var axios = require('axios');

// set the view engine to ejs
app.set('view engine', 'ejs');

// // use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
	res.render('pages/index');
});

function calculateStars(response) {
  var checkLang = {};
  var metadata = response.reduce(function(acc,currentItem){
    acc["stargazers_count"] += currentItem.stargazers_count;
 if(checkLang[currentItem.language]){
  checkLang[currentItem.language] = checkLang[currentItem.language] + 1;
}
else {
  checkLang[currentItem.language] = 1;
}
   return acc;
  },{stargazers_count:0});

if (metadata.stargazers_count<10){
  metadata['artist']="You are a beginner";
}
else if(metadata.stargazers_count>10 && metadata.stargazers_count<100){
  metadata['artist']="Good! You are getting started";
}
else if(metadata.stargazers_count>100 && metadata.stargazers_count<1000){
  metadata['artist']="That is a great deal of work";
}
else{
  metadata['artist']="Hats off! You are the PRO";
}
metadata['languages']=Object.keys(checkLang).map((item) => {
  return { value: (checkLang[item]/response.length)*100, title: item
}
});
metadata['mainlanguage'] = Object.keys(checkLang).reduce(function(a, b){
 return checkLang[a] > checkLang[b] ? a : b
});
return metadata;
}

app.get('/:id', function(req, res) {
    axios.get('https://api.github.com/users/' +req.params.id + '/repos')
  .then(function (response) {
    var getMetadata = calculateStars(response.data);
    console.log(getMetadata);
    res.render('pages/result',{
        response:response.data,
        metadata:getMetadata
    })
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.listen(process.env.PORT || 8080);
console.log('8080 is the magic port');