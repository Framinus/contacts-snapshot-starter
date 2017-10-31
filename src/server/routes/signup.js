const router = require('express').Router();
const createUser = require('../../models/db/users.js').createUser;
const bcrypt = require('bcrypt');

router.get('/', (request, response) => {
  response.status(200);
  response.render('login/signup');
});

router.post('/', (request, response) => {
  const { username, password, role } = request.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      createUser(username, hash, role);
    })
    .then((userProfile) => {
      console.log(userProfile);
      response.redirect('/');
    })
    .catch(console.error);
});

module.exports = router;
