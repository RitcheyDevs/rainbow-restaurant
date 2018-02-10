var express = require('express');
var router = express.Router();
var firebaseDB = require('../connections/firebase_admin_connect');

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/system', { title: '系統通知 ｜ Rainbow 餐廳', message: '' });
});

router.post('/addProduct', function(req, res, next) {
  let data = req.body.product;
  firebaseDB.ref('products').push(JSON.parse(data));
  res.redirect('/index');
});

router.post('/addTag', function(req, res, next) {
  let data = req.body.tag;
  firebaseDB.ref('tags').push(data);
  res.redirect('/');
});

module.exports = router;
