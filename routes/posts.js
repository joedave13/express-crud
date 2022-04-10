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

module.exports = router;
