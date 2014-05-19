'use strict';

var mongoose = require('mongoose'),
    TodoModel = require('../models/todo'),
    assert = require("assert");

describe('todos test cases', function() {

    mongoose.connect('mongodb://127.0.0.1:27017/tobebought');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
      console.log('db connection open');
    });

  it('respond with number of todos in the app', function(done) {
    console.log('test running');
    TodoModel.find(function(err, res) {
      console.log('find call back');
      if(err) {
        throw err;
      }
      assert.equal(9, res.length);
      done();
    });
  });

});
