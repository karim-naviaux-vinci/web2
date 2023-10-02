var express = require('express');
var router = express.Router();

const {serialize, parse} = require('../utils/json');
const jsonDbPath = __dirname + '/../data/pizzas.json';

//creation pizzas for the menu
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


//read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log("GET /pizzas/" + req.params.id);

    const pizzas = parse(jsonDbPath, MENU);

    const indexOfPizzaFound = pizzas.findIndex((pizza) => pizza.id == req.params.id);

    if(indexOfPizzaFound < 0) return res.sendStatus(404);


    res.json(pizzas[indexOfPizzaFound]);
})

/** Read all pizzas from the menu
 * GET /pizzas?order=title ascending order by title
 * GET /pizzas?order=-title : descending order by title 
 */
router.get('/', (req, res, next) => {
    const orderByTitle = 
    req?.query?.order?.includes('title') 
    ? req.query.order 
    : undefined;

    let orderedMenu;
    console.log('order by ' + orderByTitle ?? 'not requested');

    const pizzas = parse(jsonDbPath, MENU);

    if(orderByTitle)
        orderedMenu = [...pizzas].sort((a,b) => a.title.localeCompare(b.title));
    if(orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

    console.log('GET /pizzas');
    res.json(orderedMenu ?? MENU);
});

// demander au prof pq la methode reverse ne fonctionne pas alors que comme ca si
// router.get('/', (req, res, next) => {
//     // operateur ternaire permet de verifier que order = title (avec include()) sinon order = undefined
//     const orderByTitle = 
//     req?.query?.order?.includes('title') 
//     ? req.query.order 
//     : undefined;

//     let orderedMenu;
//     console.log('order by ' + orderByTitle ?? 'not requested');
//     if(orderByTitle === 'title') {
//         //[...MENU] permet de copier le tableau MENU dans un autre tableau de maniere superficiel (le but est le meme qu'en utilisant une boucle)

//         orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title)); // permet de comparer le nouvelle objet (a) avec l'objet precedent (b)
//     } else if(orderByTitle === '-title') {
//         orderedMenu = [...MENU].sort((a, b) => b.title.localeCompare(a.title));
//     }

//     console.log('GET /pizzas');
//     // si la valeur orderedMenu est null ou undefined alors elle renvoie menu
//     res.json(orderedMenu ?? MENU);
// });

router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;


    console.log(title + " " + content)

    if(!title || !content) return res.sendStatus(404);

    const pizzas = parse(jsonDbPath, MENU);
    const lastItemIndex = MENU?.length !== 0 ? MENU[MENU.length - 1].id : undefined;
    const nextIndex = lastItemIndex + 1; 

    const newFilm = {
        id : nextIndex,
        title : title,
        content : content,
    };

    pizzas.push(newFilm);
    serialize(jsonDbPath, pizzas);
    console.log("POST - " + JSON.stringify(pizzas))
    res.json(newFilm);

})

router.delete('/:id', (req, res) => {
    console.log("l'id de l'element supprime est : " + req.params.id);

    //transfere des object du tableau MENU dans un fichier dans le dossier
    const pizzas = parse(jsonDbPath, MENU);

    console.log(JSON.stringify(pizzas));

    // renvoie -1 si aucun element est trouvé 
    const elementSupp = pizzas.findIndex(pizza => pizza.id == req.params.id);

    if(elementSupp < 0) return res.sendStatus(404);

    // supprime l'element a partir de l'index stocke et le 2e parametre permet de supprime 1 element
    // renvoie un tableau de l'element supprime
    const tbl = pizzas.splice(elementSupp, 1); 
    const itemTbl = tbl[0];

    serialize(jsonDbPath, pizzas)
    console.log("MAJ :" + JSON.stringify(pizzas));

    res.json(itemTbl);


})

module.exports = router;


























module.exports = router;