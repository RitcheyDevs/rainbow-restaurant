var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
// firebase 認證功能
var fireAuth = firebase.auth();

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('pages/register', { title: '註冊 ｜ Rainbow 餐廳' });
});

/* post 註冊 */
router.post('/', function (req, res) {
  const data = req.body;
  fireAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(function(user){
          // 成功
          res.send({
            "message": "註冊成功！",
            "returnCode": 200
          });
      })
      .catch(function(error){
        console.log('error', error);
        let errorMeg = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMeg = '註冊失敗！此信箱已經存在！請重新輸入！';
            break;
          case 'auth/invalid-email':
            errorMeg = '註冊失敗！此信箱非有效信箱！請重新輸入！';
            break;
          case 'auth/operation-not-allowed':
            errorMeg = '註冊失敗！firebase 設定信箱未啟用！';
            break;
          case 'auth/weak-password':
            errorMeg = '註冊失敗！此密碼不夠安全！請重新輸入！';
            break;
          default:
            errorMeg = '註冊失敗！';
            break;
        }
          // 失敗
          res.send({
            "message": errorMeg,
            "returnCode": 400
          })
      });
  
})

module.exports = router;
