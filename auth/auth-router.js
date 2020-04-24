const router = require('express').Router();

Users = require('../models/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
