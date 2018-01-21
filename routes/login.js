var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/login', { title: '登入 ｜ Rainbow 餐廳' });
});

module.exports = router;
