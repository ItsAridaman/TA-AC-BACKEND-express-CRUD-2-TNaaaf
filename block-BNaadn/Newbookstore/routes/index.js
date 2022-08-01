var express = require('express');
const bookdetail = require('../models/bookdetail');
const comment = require('../models/comment');



var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/home', (req, res) => {
  bookdetail.find({}, (err, content) => {
    if (err) console.log(err);
    res.render('index.ejs', { content: content });
  })
});

router.get('/home/Category', (req, res) => {
  var category = req.query.Category;
  var author = req.query.Author;
  var title = req.query.Title;

  console.log(req.query);
  bookdetail.find({ $or: [{ Category: category }, { Author: author }, { Title: title }] }, (err, content) => {

    if (err) console.log(err);
    res.render('index.ejs', { content: content });
  })

});



router.get('/add', (req, res) => {

  res.render('add.ejs');
})

router.post('/add', (req, res) => {
  bookdetail.create(req.body, (err, create) => {
    if (err) console.log(err);

    res.redirect("/home");
  });

})


router.get('/bookdetails/:id', (req, res) => {
  var id = req.params.id;

  bookdetail.findById(id).populate('comments').exec((err, content) => {
    if (err) console.log(err);
    console.log(content)
    res.render('bookdetails.ejs', { content });
  })
});

router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  console.log(id);
  bookdetail.findById(id, req.body, (err, content) => {
    if (err) console.log(err);

    res.render('bookedit.ejs', { content: content });
  })
})

router.post('/:id/edit', (req, res) => {
  var id = req.params.id;

  bookdetail.findByIdAndUpdate(id, req.body, { new: true }, (err, content) => {
    if (err) console.log(err);
    res.redirect('/bookdetails/' + id);
  })
})


router.get('/:id/delete', (req, res) => {
  var id = req.params.id;

  bookdetail.findByIdAndDelete(id, req.body, (err, content) => {
    if (err) console.log(err);

    comment.deleteMany({ bookId: content.id }, (err, success) => {
      res.redirect('/home');
    });
  })
})




router.post('/:id/comment', (req, res) => {
  var id = req.params.id;
  req.body.bookId = id;

  comment.create(req.body, (err, success) => {
    if (err) console.log(err);
    console.log(success);

    bookdetail.findByIdAndUpdate(id, { $push: { comments: success._id } }, (err, result) => {
      if (err) console.log(err);
      res.redirect('/bookdetails/' + id);
    });

  })
})

router.get('/:id/comment/edit', (req, res) => {
  var id = req.params.id;
  comment.findById(id, req.body, (err, result) => {
    console.log(result);
    console.log(result.id);
    res.render('commentedit.ejs', { result: result })
  })
})

router.post('/:id/comment/edit', (req, res) => {
  var id = req.params.id;
  comment.findByIdAndUpdate(id, req.body, (err, result) => {
    res.redirect('/bookdetails/' + result.bookId);
  })
})

router.get('/:id/comment/delete', (req, res) => {
  {
    var id = req.params.id;
    comment.findByIdAndDelete(id, req.body, (err, success) => {
      if (err) console.log(err);
      console.log(success);
      bookdetail.findByIdAndUpdate(success.bookId, { $pull: { comments: success._id } }, (err, result) => {
        if (err) console.log(err);
        console.log("comment deleted from reference aswell")
        res.redirect('/bookdetails/' + success.bookId);

      })
    })
  }
});




router.get('/:id/Likes', (req, res) => {
  var id = req.params.id;
  bookdetail.findByIdAndUpdate(id, { $inc: { Likes: 1 } }, (err, success) => {
    if (err) console.log(err);
    console.log(success.Likes);
    res.redirect('/bookdetails/' + id);
  })
});



module.exports = router;
