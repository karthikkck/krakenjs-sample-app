'use strict';


var MypageModel = require('../models/mypage');
var q = require('q');
var UserModel = require('../models/user');
var TodoModel = require('../models/todo');


module.exports = function (app) {

    var model = new MypageModel();


    var getUsers = function getUser() {
      var deferred = q.defer();

      console.log('in getusers');
      UserModel.find(function(err, users) {
          console.log('found users');
          deferred.resolve({users: users});
      });

      return deferred.promise;
    };

    var getCompletedTasks = function getCompletedTasks(data) {
      var deferred = q.defer();

      console.log('in get ctodos');
      TodoModel.find({status: true }, function(err, todos) {
          console.log('found ctodos');
          data.ctodos = todos;
          deferred.resolve(data);
      });

      return deferred.promise;
    };

    var getPendingTasks = function getPendingTasks(data) {
      var deferred = q.defer();

      console.log('in get ptodos');
      TodoModel.find({status: false }, function(err, todos) {
          console.log('found ptodos');
          data.ptodos = todos;
          deferred.resolve(data);
      });

      return deferred.promise;
    };

    app.get('/mypage', function (req, res) {
      /*
      console.log('no dependency calls');
      q.allSettled(
        [getUsers,
        getCompletedTasks,
        getPendingTasks])
        .then(function(results) {
          console.log(results);
          res.render('mypage', results);
        });
        */
        console.log('dependency calls');
        getUsers()
        .then(getCompletedTasks)
        .then(getPendingTasks)
        .done(function(data) {
            res.render('mypage', data);
        });
    });

};
