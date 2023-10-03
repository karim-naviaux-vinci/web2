var express = require('express');
var router = express.Router();

const {serialize, parse} = require('../utils/json');
const jsonDbPath = __dirname + "../data/films.json";

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

router.post('/', (req, res) => {
    const title = typeof req?.body?.title == 'string' && req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = typeof req?.body?.duration == 'number' && req?.body?.duration > 0 ? req.body.duration : undefined;
    const budget = typeof req?.body?.budget == 'number' && req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = typeof req?.body?.link == 'string' && req?.body?.link?.length > 0 ? req.body.link : undefined;

    console.log(title + " " + duration + " " + budget + " " + link)

    if(!title || !duration || !budget || !link) return res.sendStatus(404);

    const films = parse(jsonDbPath, CATALOGUE_FILM);

    const lastIndex = films[films.length - 1].id;
    const nextId = lastIndex + 1;

    let newFilm = {
        id : nextId,
        title : title,
        duration : duration, 
        budget : budget,
        link : link
    };

    serialize(jsonDbPath, films);
    CATALOGUE_FILM.push(newFilm)
    console.log("POST - " + JSON.stringify(films))

    res.json(newFilm);
})

router.delete('/:id', (req, res) => {
    console.log("element supprime : " + req.params.id);

    const foundIndex = CATALOGUE_FILM.findIndex(film => film.id == req.params.id);

    if(foundIndex < 0) return res.sendStatus(404);

    const tbl = CATALOGUE_FILM.splice(foundIndex, 1);
    const itemTbl = tbl[0];

    res.json(itemTbl);
})

router.patch('/:id',(req, res) => {
    console.log("l'id de l'element qu'on va supprimer : " + req.params.id);

    console.log(req.body.title)
    
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;

    if(!title) return res.sendStatus(400);

    const indexFound = CATALOGUE_FILM.findIndex(film => film.id == req.params.id);

    if(indexFound < 0) return res.sendStatus(404);

    //les element d'objet du tableau copié va etre ecraser par la copie des nouveau element (...req.body)
    const update = {...CATALOGUE_FILM[indexFound], ...req.body};
    //on remplace le nouvelle objet (update) a l'objet se trouvant dans l'indice (indexFound)
    CATALOGUE_FILM[indexFound] = update;

    res.json(update);
})

module.exports = router;