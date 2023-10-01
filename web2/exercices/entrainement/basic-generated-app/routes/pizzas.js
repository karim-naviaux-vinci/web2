var express = require('express');
var router = express.Router();

var pizza = [
    {
        id:1,
        title:"pizza 1"
    },

    {
        id:2,
        title : "pizza 2"
    }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  const order = req?.query?.order?.includes('title') ? req.query.order : undefined;

  if(!order) return res.sendStatus(404);

  let table;
  if(order){
    table = [...pizza].sort((a,b) => a.title.localeCompare(b.title)); 
  }
  if(order === '-title'){table = table.reverse();}

  res.json(table ?? pizza);
});

router.get('/:id', (req, res) => {
    const index =  pizza.findIndex((pizza) => pizza.id === parseInt(req.params.id));
    res.json(pizza[index]);
})


router.post('/', (req, res) => {
    const title = req?.body?.title?.length > 0 ? req.body.title : undefined;

    if(!title) return res.sendStatus(404);

    const lastId = pizza?.length !== 0 ? pizza[pizza.length - 1].id : undefined;
    const nextId = lastId + 1;

    let newPizza = {
        id : nextId,
        title : title
    };

    pizza.push(newPizza)

    res.json(pizza);
    
})

// router.get('/', (req,res) => {
//     res.json(pizza);
// })

module.exports = router;