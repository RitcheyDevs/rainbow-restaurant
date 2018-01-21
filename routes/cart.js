var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/cart', { title: '線上訂購美食 ｜ Rainbow 餐廳' });
});

module.exports = router;
