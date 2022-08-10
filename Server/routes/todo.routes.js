module.exports = app => {
  const Todo = require('../controllers/todo.controllers')
  var router = require("express").Router();
  // 
  router.post('/' , Todo.create)
  router.get('/' , Todo.findAll)
  router.get('/:id' , Todo.findOne)
  router.put('/:id' , Todo.update)
  router.delete('/:id' , Todo.delete)
  router.delete('/' , Todo.deleteAll)
  app.use('/todos', router);
};