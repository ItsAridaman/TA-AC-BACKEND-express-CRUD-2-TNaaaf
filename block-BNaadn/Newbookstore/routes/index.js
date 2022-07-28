var express = require('express');
const bookdetail = require('../models/bookdetail');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/home', (req,res)=>
{
  bookdetail.find({}, (find,err)=>
  {
    if(err) console.log(err);
    res.render('index.ejs', {find:find});
})
});



router.get('/add',(req,res)=>
{
  console.log("add is working fine..");
  res.render('add.ejs');
})

router.post('/add',(req,res)=>
{
  bookdetail.create(req.body, (err, create)=>
  {
    if (err) console.log(err);
    console.log(req.body);
    res.redirect("/home");
  });
  
})

module.exports = router;
