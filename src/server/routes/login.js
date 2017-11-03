const router = require('express').Router();
const validateUser = require('../../models/db/users.js').validateUser;
const bcrypt = require('bcrypt');

router.get('/', (request, response) => {
  // response.flash('errorMsg', 'Incorrect email or password');
  response.render('login/login', { errorMsg: "" });
});

router.post('/', (request, response) => {
  const sess = request.session;
  const { username, password } = request.body;
  validateUser(username)
    .then((userData) => {
      bcrypt.compare(password, userData.password)
        .then((result) => {
          if (result) {
            sess.username = userData.username;
            sess.role = userData.role;
            response.redirect('/');
          } else {
            response.render('login/login', { errorMsg: 'Incorrect email or password' });
          }
        })
        .catch(console.error);
    })
    .catch((err) => {
      console.error(err);
      response.render('login/login', { errorMsg: 'Incorrect email or password' });
    });
});


module.exports = router;
