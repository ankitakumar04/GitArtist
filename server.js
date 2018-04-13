<<<<<<< HEAD
// load the things we need
var express = require('express');
var app = express();
var axios = require('axios');
var path = require('path');
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
=======
/* load the things we need */
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

/* View engine */
app.set('view engine', 'ejs');

/*  Set the index route */
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/favicon.ico', function(req,res){
  res.sendFile(__dirname + "/public/favicon.png");
>>>>>>> 36463be55946f45e7bcb53d801c8a52b46f44381
});
/* static path */
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));

function parseData(response, user) {
    var checkLang = {};
    const metadata = response.reduce(function(acc, currentItem) {
        acc.stargazers_count += currentItem.stargazers_count;
        if (checkLang[currentItem.language]) {
            checkLang[currentItem.language] = checkLang[currentItem.language] + 1;
        } else {
            checkLang[currentItem.language] = 1;
        }
        return acc;
    }, {
        stargazers_count: 0
    });
    metadata['languages'] = Object.keys(checkLang).map((item) => {
        return {
            value: (checkLang[item] / response.length) * 100,
            title: item
        }
    });
    metadata['mainlanguage'] = Object.keys(checkLang).reduce(function(a, b) {
        return checkLang[a] > checkLang[b] ? a : b
    });

    if (metadata.stargazers_count > 1000) {
=======
/* parses the Github response */
const parseData = (response, user) => {
    const checkLang = {};
    const metadata = response.reduce((acc, currentItem) => {
        acc.stargazers_count += currentItem.stargazers_count;
        if (checkLang[currentItem.language]) {
            checkLang[currentItem.language] = checkLang[currentItem.language] + 1;
        } else {
            checkLang[currentItem.language] = 1;
        }
        return acc;
    }, {
        stargazers_count: 0
    });
    metadata.languages = Object.keys(checkLang).map((item) => {
        return {
            value: (checkLang[item] / response.length) * 100,
            title: item
        }
    });
    metadata.mainlanguage = Object.keys(checkLang).reduce((a, b) => {
        return checkLang[a] > checkLang[b] ? a : b
    });

    if(metadata.mainlanguage == "null") {
      metadata.mainlanguage = 'Unpredicatable'
    }

    if (metadata.stargazers_count > 5000) {
      metadata['artist'] = {
        id: 'dragons',
        character: 'Drogon',
        desc: 'You are the most powerful dragon Westeros has ever seen. They all bow down to you and nothing can ever break your fervour.'
      }
    } else if (metadata.stargazers_count > 1000) {
>>>>>>> 36463be55946f45e7bcb53d801c8a52b46f44381
        metadata['artist'] = {
            id: 'jon',
            character: 'Jon Snow',
            desc: 'You are the King! You are respected by everyone, good at what you do. You take up any given job with dedication and are praised for it. King in the north! '
        }
    } else if (metadata.stargazers_count > 250 && user.followers > 25) {
        metadata['artist'] = {
            id: 'danny',
            character: 'Daenerys Targaryen',
            desc: 'You are the Queen! You have a great fan following and people look up to you!  You have the potential to unleash your dragons! Dracarys!'
        }
    } else if (metadata.languages.length > 4) {
        metadata['artist'] = {
            id: 'arya',
            character: 'Arya Stark',
<<<<<<< HEAD
            desc: 'With your experience in varied languages, you can master anything taught to you. You can be the "Faceless man", don different hats! '
=======
            desc: 'With your experience in varied languages, you can master anything taught to you. You can be the "Faceless man", don differnt hats! '
>>>>>>> 36463be55946f45e7bcb53d801c8a52b46f44381
        }
    } else if (metadata.languages.length <= 3 && metadata.stargazers_count > 50) {
        metadata['artist'] = {
            id: 'tyrion',
            character: 'Tyrion Lannister',
            desc: 'You seem to be the master of the domain you like, and would want to pursue it further'
        }
    } else {
        metadata['artist'] = {
            id: 'sansa',
            character: 'Sansa Stark',
            desc: 'You are a mysterious person. You don\'t like to share much, and are very reserved. Go out and shine!'
        }
    }

    return metadata;
}

<<<<<<< HEAD
app.get('/:id', function(req, res) {
    axios.get('https://api.github.com/users/' + req.params.id).then((user) => {
        axios.get('https://api.github.com/users/' + req.params.id + '/repos')
            .then((response) => {
                var getMetadata = parseData(response.data, user.data);
=======
/* Set the results path */
app.get('/:id', (req, res) => {
    axios.get('https://api.github.com/users/' + req.params.id).then((user) => {
        axios.get('https://api.github.com/users/' + req.params.id + '/repos')
            .then((response) => {
                const getMetadata = parseData(response.data, user.data);
>>>>>>> 36463be55946f45e7bcb53d801c8a52b46f44381
                res.render('pages/result', {
                    response: response.data,
                    user: user.data,
                    metadata: getMetadata
                })
            })
<<<<<<< HEAD
            .catch(function(e) {
		console.log(e);
                res.render('pages/404');

            });
    }).catch((e) => {
	console.log(e);
=======
            .catch((e) => {
                console.log(e);
                res.render('pages/404');
            });
    }).catch((e) => {
        console.log(e);
>>>>>>> 36463be55946f45e7bcb53d801c8a52b46f44381
        res.render('pages/404');
    })
})

app.listen(process.env.PORT || 8000);
