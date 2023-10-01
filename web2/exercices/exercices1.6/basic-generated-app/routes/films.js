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

router.get('/', (req, res) => {
    res.json(CATALOGUE_FILM);
})

router.delete('/:id', (req, res) => {
    console.log("l'id de l'element supprimé : " + req.params.id);

    const indexFound = CATALOGUE_FILM.findIndex(film => film.id == req.params.id);

    if(indexFound < 0) return res.sendStatus(404);

    const tbl = CATALOGUE_FILM.splice(indexFound, 1);
    const elementSupp = tbl[0];

    res.json(elementSupp);
})

router.patch('/:id', (req,res) => {
    console.log("modification de la ressource ayant l'indice : " + req.params.id);

    const title = req?.body?.title?.length > 0 ? req.body.title : undefined;
    const duration = req?.body?.duration >= 60 ? req.body.duration : undefined;
    const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length > 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link) return res.sendStatus(400);

    const indexFound = CATALOGUE_FILM.findIndex(film => film.id == req.params.id);

    if(indexFound < 0) return res.sendStatus(404);

    const object = {...CATALOGUE_FILM[indexFound], ...req.body};
    CATALOGUE_FILM[indexFound] = object;

    res.json(object);
})

module.exports = router;