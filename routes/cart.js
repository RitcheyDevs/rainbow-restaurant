var express = require('express');
var router = express.Router();
var firebaseDB = require('../connections/firebase_admin_connect');

/* 產品頁 */
router.get('/', function(req, res, next) {
  firebaseDB.ref('products').once('value', (snapshot)=>{
    let data = [];
    let tagName = [];
    let tagObject = [];
    snapshot.forEach((item)=>{
      data.push(item.val());
      let tag = Object.keys(item.val().tags);
      Array.prototype.push.apply(tagName, tag);
    });
    tagObject = getTagObject(tagName, data);
    res.render('pages/cart', { title: '線上訂購美食 ｜ Rainbow 餐廳', products: data, tagObject: tagObject });
  });
});

/* 取得單一產品功能 */
router.get('/tag/:name', function(req, res, next) {
  let queryTag = req.params.name;
  firebaseDB.ref('products').once('value', (snapshot)=>{
    let data = [];
    let tagName = [];
    let tagObject = [];
    snapshot.forEach((item)=>{
      data.push(item.val());
      let tag = Object.keys(item.val().tags);
      Array.prototype.push.apply(tagName, tag);
    });
    tagObject = getTagObject(tagName, data);
    let queryData = getTagItem(queryTag, data);
    res.render('pages/cart', { title: '線上訂購美食 ｜ Rainbow 餐廳', products: queryData, tagObject: tagObject });
  });
  
});

/* 搜尋功能 */
router.post('/keyword', function(req, res, next) {
  let queryTag = req.body.keyword;
  firebaseDB.ref('products').once('value', (snapshot)=>{
    let data = [];
    let tagName = [];
    let tagObject = [];
    snapshot.forEach((item)=>{
      data.push(item.val());
      let tag = Object.keys(item.val().tags);
      Array.prototype.push.apply(tagName, tag);
    });
    tagObject = getTagObject(tagName, data);
    let queryData = getKeywordItem(queryTag, data);
    res.render('pages/cart', { title: '線上訂購美食 ｜ Rainbow 餐廳', products: queryData, tagObject: tagObject });
  });
  
});

/* 組成tag資料 */
function getTagObject(tagName, data) {
  let tagObject = [];
  tagName = Array.from( new Set(tagName) );
  for(item of tagName){
    let obj = {};
    obj.name = item;
    obj.num = getTagItemLength(obj.name, data);
    tagObject.push(obj);
  }
  tagObject.unshift({
    name: '全部',
    num: data.length
  });
  return tagObject;
}

/* 取得每個tag的數量 */
function getTagItemLength(name, data) {
  var filterData = data.filter(function(item, index, array){
    return item.tags[name];
  });
  return filterData.length;
}

/* 取得tag資料 */
function getTagItem(name, data) {
  let filterData = [];
  if(name === '全部'){
    filterData = data;
  }else{
    filterData = data.filter(function(item, index, array){
      return item.tags[name];
    }); 
  }
  return filterData;
}

/* 取得關鍵字資料 */
function getKeywordItem(name, data) {
  var filterData = data.filter(function(item, index, array){
    return (item.chName.indexOf(name)!=-1)
  });
  return filterData;
}

module.exports = router;
