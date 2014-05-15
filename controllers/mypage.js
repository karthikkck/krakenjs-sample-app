'use strict';


var MypageModel = require('../models/mypage');


module.exports = function (app) {

    var model = new MypageModel();


    app.get('/mypage', function (req, res) {

        res.render('mypage', model);

    });

};
