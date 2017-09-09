// load the things we need
var express = require('express');
var app = express();
var axios = require('axios');
var path = require('path');
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

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

    if(metadata.mainlanguage == "null") {
      meta.mainlanguage = 'Unpredicatable'
    }

    if (metadata.stargazers_count > 1000) {
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
            desc: 'With your experience in varied languages, you can master anything taught to you. You can be the "Faceless man", don differnt hats! '
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

app.get('/:id', function(req, res) {
    axios.get('https://api.github.com/users/' + req.params.id).then((user) => {
        axios.get('https://api.github.com/users/' + req.params.id + '/repos')
            .then((response) => {
                var getMetadata = parseData(response.data, user.data);
                res.render('pages/result', {
                    response: response.data,
                    user: user.data,
                    metadata: getMetadata
                })
            })
            .catch(function(error) {
                res.render('pages/404');
            });
    }).catch((e) => {
        res.render('pages/404');
    })
})

app.listen(process.env.PORT || 8000);
