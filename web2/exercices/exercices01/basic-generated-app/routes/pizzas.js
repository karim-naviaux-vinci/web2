var express = require('express');
var router = express.Router();

const MENU = [
    {
        id:1,
        title:'4 fromages',
        content:'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates'
    },

    {
        id:2,
        title:'vegan',
        content:'Tomates, Courgettes, Oignons, Aubergines, Poivrons'
    },

    {
        id:3,
        title:'Vegetarian',
        content:'Tomates, Oignons, Poivrons, Champignons, Olives, Mozarella '
    }
];

router.get('/', (req, res, next) => {
    console.log('GET /pizzas');
    res.json(MENU);
});

module.exports = router;