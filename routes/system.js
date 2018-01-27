var express = require('express');
var router = express.Router();
var firebase = require('../config/firebase');

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/system', { title: '系統通知 ｜ Rainbow 餐廳', message: '' });
});

router.post('/addProduct', function(req, res, next) {
  let data = req.body.product;
  firebase.ref('products').push(JSON.parse(data));
  res.redirect('/index');
});

router.post('/addTag', function(req, res, next) {
  let data = req.body.tag;
  firebase.ref('tags').push(data);
  res.redirect('/');
});

module.exports = router;
