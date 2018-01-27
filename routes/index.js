const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const csurf = require('csurf');
// 設定 csrf 要夾帶 cookie 才是有效
const csrfProtection = csurf({ cookie: true });

// 載入環境變數設定
require('dotenv').config();

/* GET home page 且要夾帶 csrfProtection */
router.get('/', csrfProtection, function(req, res, next) {
  // pass the csrfToken to the view
  res.render('pages/index', { title: '首頁 ｜ Rainbow 餐廳', csrfToken: req.csrfToken()});
});

/* 預約 */
router.post('/reserve', csrfProtection, function(req, res, next) {
  req.checkBody({
    name: {
      notEmpty: true
    },
    phone: {
      notEmpty: true
    },
    email: {
      notEmpty: true,
      isEmail: true
    },
    count: {
      notEmpty: true
    }
  });

  const data = req.body;
  
  const errors = req.validationErrors();
  if (errors) {
    res.redirect('/');
  } else {
    //宣告發信物件
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASS
      }
    });

    // 寄信內容
    const mailOptions ={
      //寄件者
      from: '"Rainbow 餐廳"<rainbow@restaurant.com>',
      //收件者
      to: data.email, 
      //主旨
      subject: 'Rainbow 餐廳：預約通知',
      //純文字
      text: '',
      //嵌入 html 的內文
      html: `<h2>${data.name} 顧客您好：</h2>
      <p>我們已收到您的預約通知，</p>
      <p>總人數為：${data.count} 人</p>
      <p>到時候會播打此電話 ${data.phone} 再次確認，</p>
      <p>祝您用餐愉快。</p>
      `
    }

    //發送信件
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          // console.log(error);
          // res.render('pages/system', { title: '系統通知 ｜ Rainbow 餐廳', message: '發送失敗' });
          res.send({
            "message": "發送失敗！",
            "returnCode": 400
          });
      }else{
          // console.log('訊息發送: ' + info.response);
          // res.render('pages/system', { title: '系統通知 ｜ Rainbow 餐廳', message: '發送成功' });
          res.send({
            "message": "發送成功！",
            "returnCode": 200
          });
      }
    });
  }

});

module.exports = router;
