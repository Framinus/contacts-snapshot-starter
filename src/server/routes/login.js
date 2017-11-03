const router = require('express').Router();
const validateUser = require('../../models/db/users.js').validateUser;
const bcrypt = require('bcrypt');

router.get('/', (request, response) => {
  request.flash('errorMsg', 'Incorrect email or password');
  response.render('login/login');
});

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
      else {
        response.render('login', { messages: request.flash('errorMsg') });
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
});

module.exports = router;
