var express = require('express');
var router = express.Router();

var connection = require('../library/database');

router.get('/', function (req, res, next) {
  connection.query(
    'SELECT * FROM posts ORDER BY id DESC',
    function (err, rows) {
      if (err) {
        req.flash('error', err);
        res.render('posts', {
          data: '',
        });
      } else {
        res.render('posts/index', {
          data: rows,
        });
      }
    }
  );
});

router.get('/create', function (req, res, next) {
  res.render('posts/create', {
    title: '',
    content: '',
  });
});

router.post('/store', function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let errors = false;

  if (title.length === 0) {
    errors = true;

    req.flash('error', 'Title is required!');
    res.render('posts/create', {
      title: title,
      content: content,
    });
  }

  if (content.length === 0) {
    errors = true;

    req.flash('error', 'Content is required!');
    res.render('posts/create', {
      title: title,
      content: content,
    });
  }

  if (!errors) {
    let formData = {
      title: title,
      content: content,
    };

    connection.query(
      'INSERT INTO posts SET ?',
      formData,
      function (err, result) {
        if (err) {
          req.flash('error', err);

          res.render('posts/create', {
            title: formData.title,
            content: formData.content,
          });
        } else {
          req.flash('success', 'Post created successfully!');
          res.redirect('/posts');
        }
      }
    );
  }
});

module.exports = router;
