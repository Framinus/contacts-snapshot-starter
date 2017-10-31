const router = require('express').Router();
const validateUser = require('../../models/db/users.js').validateUser;
const bcrypt = require('bcrypt');

router.post('/', (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  validateUser(username)
    .then((userData) => {
      bcrypt.compare(password, userData.password)
        .then((success) => {
          if (success) {
            console.log(success);
            response.redirect('/');
          }
        })
        .catch((err) => {
          console.error(err);
          process.exit();
        });
    });
});

module.exports = router;
