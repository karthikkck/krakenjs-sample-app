'use strict';

var mongoose = require('mongoose');

var TodoModel = function() {
  var todoSchema = mongoose.Schema({
    name: String,
    status: { type: Boolean, default: false }
  });

  var Todo = mongoose.model('Todo', todoSchema);

  Todo.schema.path('name').validate(function(value) {
    return /[a-zA-Z]+/.test(value);
  }, 'Task title cannot be empty');


  return Todo;
}

module.exports = new TodoModel();
