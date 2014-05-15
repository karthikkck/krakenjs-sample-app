'use strict';

var TodoModel = require('../models/todo'),
    auth = require('../lib/auth');

module.exports = function(app) {
  var model = new TodoModel();

  app.get('/todos', auth.isAuthenticated(), function(req, res) {
    var todos = TodoModel.find(function(err, todos) {
      if(err) {
        throw err;
      }
      var model = { todos: todos };
      res.render('todo', model);
    });
  });

  app.delete('/todos', auth.isAuthenticated(), function(req, res) {
    TodoModel.remove({_id: req.body.todo_id}, function (err) {
      if (err) {
        console.log('Remove error: ', err);
      }
      res.redirect('/todos');
    });
  });

  app.put('/todos', auth.isAuthenticated(), function(req, res) {
    TodoModel.update({_id: req.body.todo_id }, { name: req.body.name, status: req.body.status }, function (err) {
      if (err) {
        console.log('Remove error: ', err);
      }
      res.redirect('/todos');
    });
  });

  app.get('/todos/add', auth.isAuthenticated(), function(req, res) {
    res.render('addtodo', model);
  });

  app.post('/todos/add', auth.isAuthenticated(), function(req, res) {
    var todo = new TodoModel();
    todo.name = req.param('name');
    todo.save(function(err) {
      if(err)
        throw err;
      res.redirect('/todos');
    });
  });

};
