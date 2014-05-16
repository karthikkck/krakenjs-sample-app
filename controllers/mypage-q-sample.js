'use strict';


var MypageModel = require('../models/mypage');
var q = require('q');
var UserModel = require('../models/user');
var TodoModel = require('../models/todo');


module.exports = function (app) {

    var model = new MypageModel();


    var getUsers = function getUsers() {
      var deferred = q.defer();

      console.log('in getusers');
      UserModel.find(function(err, users) {
          if(err)
            throw new Error(err);

          console.log('found users');
          deferred.resolve(users);
      });

      return deferred.promise;
    };

    var getCompletedTasks = function getCompletedTasks() {
      var deferred = q.defer();

      console.log('in get ctodos');
      TodoModel.find({status: true }, function(err, ctodos) {
          if(err)
            throw new Error(err);

          console.log('found ctodos');
          deferred.resolve(ctodos);
      });

      return deferred.promise;
    };

    var getPendingTasks = function getPendingTasks() {
      var deferred = q.defer();

      console.log('in get ptodos');
      TodoModel.find({status: false }, function(err, ptodos) {
          if(err)
            throw new Error(err);

          console.log('found ptodos');
          deferred.resolve(ptodos);
      });

      return deferred.promise;
    };

    app.get('/mypage-q-sample', function (req, res) {
      console.log('no dependency calls');
      q.all(
        [getUsers(),
        getCompletedTasks(),
        getPendingTasks()])
        .spread(function(users, ctodos, ptodos) {
          var data = {};
          console.log(users, ctodos, ptodos);
          data.users = users,
            data.ctodos = ctodos,
            data.ptodos = ptodos;
          res.render('mypage', data);
        });
    });

};
