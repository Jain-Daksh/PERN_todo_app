



const db = require('../models')
const Todo = db.Todo

// Create a user
exports.create = async (req, res) => {
  const userHash = {
    description: req.body.description
  }
  
    try {
      const user = await Todo.create(userHash)
      console.log(user)
      res.status(201).send({
        Todo: user,
        message: 'task created'
      })
    }
    catch (error) {
      console.log(error)
    }
};


exports.findAll = (req, res) => {
  Todo.findAll()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving task."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Todo.findByPk(id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}`
      });
    });
}
exports.delete = (req, res) => {
  const id = req.params.id;
  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete user with id=${id}`
        });
      }
    })
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(users => {
      res.status(200).send({ message: `${users} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users"
      });
    });
};

//update a user
exports.update = async (req, res) => {
  let id = req.params.id
  let user = await Todo.update(req.body, { where: { id: id } })
  if (!user) { res.status(404).send(`No user with this id = ${id} `) }
  else {
    res.status(202).send({
      message: `User data has been updated`
    })
  }
}
