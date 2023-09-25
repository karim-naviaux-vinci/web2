var express = require('express');
var router = express.Router();

const CATALOGUE_FILM = [
    {
        id:1,
        title:'pulp fiction',
        duration : 153,
        budget : 100000000,
        link : 'https://en.wikipedia.org/wiki/Pulp_Fiction'
    },

    {
        id:2,
        title:'Superman : man of steel',
        duration : 143,
        budget : 256000000,
        link : 'https://en.wikipedia.org/wiki/Man_of_Steel_(film)'
    },

    {
        id:3,
        title:'Avengers : Infinity war',
        duration : 149,
        budget : 325000000,
        link : 'https://www.imdb.com/title/tt4154756/'
    }
];

router.get('/', (req, res, next) => {
    console.log('GET /film');
    res.json(CATALOGUE_FILM);
});

module.exports = router;