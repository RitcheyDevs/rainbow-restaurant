webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

$(".submit").click(function () {
    var form = $("#form").serializeArray();
    var formObject = JSON.parse(JSON.stringify(form));

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = formObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (!item.value) {
                alert('有必填欄位沒填寫！');
                return;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $.ajax({
        url: "/reserve",
        method: "POST",
        data: form
    }).done(function (res) {
        $("#form")[0].reset();
        alert(res.message);
    }).fail(function (res) {
        alert(textStatus);
    });
});

$('.link a').click(function () {
    var target = $(this).attr('href').replace('/', '');;
    $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
],[1]);