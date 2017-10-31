const router = require('express').Router();
const validateUser = require('../../models/db/users.js').validateUser;
const bcrypt = require('bcrypt');

router.post('/', (request, response) => {
  const sess = request.session;
  const { username, password } = request.body;
  validateUser(username)
    .then((userData) => {
      if (bcrypt.compare(password, userData.password)) {
        sess.username = userData.username;
        sess.role = userData.role;
        response.redirect('/');
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
});

module.exports = router;
