var admin = require("firebase-admin");

// 設定 firebase 連接
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    databaseURL: "https://rainbow-restaurant.firebaseio.com"
});
  
// 使用 firebase 的 database
var fireData = admin.database();

module.exports = fireData;