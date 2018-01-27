var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// 設定 firebase 連接
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rainbow-restaurant.firebaseio.com"
});
  
// 使用 firebase 的 database
var fireData = admin.database();

module.exports = fireData;