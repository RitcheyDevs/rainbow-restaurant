var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/register', { title: '註冊 ｜ Rainbow 餐廳' });
});

module.exports = router;
