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
    // Extraction de la valeur "minimum_value" depuis les paramètres de la requête
    const minimum_value = req.query['minimum-duration'];

    console.log(minimum_value);

    let orderedCatalogue = [];
    
    if (minimum_value && !isNaN(minimum_value)) {
        // Si "minimum_value" est un nombre et supérieur ou égal à 143,
        // trier le catalogue par la durée
        orderedCatalogue = [...CATALOGUE_FILM].sort((a, b) => a.duration.localeCompare(b.duration));
    }

    // Répondre avec le catalogue trié ou le catalogue d'origine
    res.json(orderedCatalogue.length > 0 ? orderedCatalogue : CATALOGUE_FILM);
});


router.get('/:id', (req, res) => {
    console.log('id : ' + req.params.id);

    const indexFound = CATALOGUE_FILM.findIndex((film) => film.id == req.params.id);

    if(indexFound < 0) return res.sendStatus(404);

    res.json(CATALOGUE_FILM[indexFound]);
})

router.post('/', (req, res) => {
    const title = typeof req?.body?.title === 'string' ? req.body.title : undefined;
    const duration = typeof req?.body?.duration === 'number' && req.body.duration >= 60 ? req.body.duration : undefined;
    const budget = typeof req?.body?.budget === 'number' && req.body.budget > 0 ? req.body.budget : undefined;
    const link = typeof req?.body?.link === 'string' ? req.body.link : undefined;

    console.log(title + " " + duration + " " + budget + " " + link)

    if(!title || !duration || !budget || !link) return res.sendStatus(404);

    const lastId = CATALOGUE_FILM?.length !== 0 ? CATALOGUE_FILM[CATALOGUE_FILM.length -1].id : undefined;
    const nextIndex = lastId + 1;

    console.log(lastId);
    console.log(nextIndex);

    const newFilm = {
        id : nextIndex,
        title : title,
        duration : duration,
        budget : budget,
        link : link
    };

    CATALOGUE_FILM.push(newFilm);
    res.json(newFilm);

})


module.exports = router;