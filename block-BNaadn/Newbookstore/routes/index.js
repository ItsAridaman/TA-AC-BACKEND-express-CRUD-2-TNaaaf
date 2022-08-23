var express = require('express');
var user = require('../models/usermodel');
var product = require('../models/productmodel');
var auth = require('../middlewares/auth');


var router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    var User = await user.create(req.body);
    console.log(User);
    res.status(201).json({ User });
  }
  catch (err) {
    next(err);
  }

});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email/password required" });
  }
  try {
    var User = await user.findOne({ email })
    if (!User) {
      return res.status(400).json({ error: "email not registered" });
    }
    var result = await User.verifypassword(password)
    if (!result) {
      return res.status(400).json({ error: "Invalid password" })
    }
    req.user = User;

    var token = await User.signToken();

    res.status(201).json({ User, token });
  }
  catch (error) {
    next(error);
  }
});

router.post('/addProduct', auth.verifyTokenA, async (req, res, next) => {
  try {
    var Product = await product.create(req.body);
    res.status(201).json({ Product });
  }
  catch (err) {
    next(err);
  }
})

router.get('/productList', async (req, res, next) => {
  try {
    var Product = await product.find({});
    res.status(201).json({ Product });
  }
  catch (err) {
    next(err);
  }
})

router.post('/editProduct/:id', auth.verifyToken, async (req, res, next) => {
  try {
    var id = req.params.id;
    var NewProduct = req.body;
    var result = await product.findOneAndUpdate(id, NewProduct);
    res.status(201).json({ result });
  }
  catch (err) {
    next(err);
  }
})


router.get('/delete/:id', auth.verifyTokenA, async (req, res, next) => {
  try {
    var id = req.params.id;
    var result = await product.findOneAndUpdate(id);
    res.status(201).json({ result });
  }
  catch (err) {
    next(err);
  }
});


module.exports = router;
