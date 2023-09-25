var express = require('express');
var router = express.Router();

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

    const indexOfPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id);

    if(indexOfPizzaFound < 0) return res.sendStatus(404);

    res.json(MENU[indexOfPizzaFound]);
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
    if(orderByTitle)
        orderedMenu = [...MENU].sort((a,b) => a.title.localeCompare(b.title));
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

    const lastItemIndex = MENU?.length !== 0 ? MENU.film - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
    const nextIndex = lastId + 1; 

    const newFilm = {
        id : nextIndex,
        title : title,
        content : content,
    };

    MENU.push(newFilm);
    res.json(newFilm);

})
module.exports = router;