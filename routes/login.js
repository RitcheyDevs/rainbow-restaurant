var express = require('express');
var firebase = require('../connections/firebase_connect');
// firebase 認證功能
var fireAuth = firebase.auth();

var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/login', { title: '登入 ｜ Rainbow 餐廳' });
});

/* post 登入 */
router.post('/', function (req, res) {
  const data = req.body;
  fireAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(function(user){
          // 成功
          req.session.uid = user.uid;
          req.session.user = user.email;
          res.send({
            "message": "登入成功！",
            "returnCode": 200
          });
      })
      .catch(function(error){
          // 失敗
          res.send({
            "message": "登入失敗！",
            "returnCode": 400
          })
      });
  
})

module.exports = router;
