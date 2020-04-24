const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

Users = require('../models/users-model.js');
secrets = require('./secrets.js');

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
  let { username, password } = req.body;

  // search for username:
  Users.findById({ username })
    .then(([user]) => {
      // if user found, check that passwords match:
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token:
        const token = generateToken(user);
        // send that token to the client:
        res.status(200).json({ message: "Welcome to Dad Jokes!", token})
      } else {
        res.status(401).json({ message: "Password incorrect. You cannot pass."})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message })
    })

    function generateToken(user) {
      // the data:
      const payload = {
        userId: user.id,
        username: user.username,
      };
      const secret = secrets.jwtSecret;
      const options = {
        expiresIn: "1d",
      };

      // creating the token:
      return jwt.sign(payload, secret, options);
    }

});

module.exports = router;
