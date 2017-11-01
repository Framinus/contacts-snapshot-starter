const router = require('express').Router();
const contactsRoutes = require('./contacts');
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const signupRoute = require('./signup');
const loginRoute = require('./login');
const hasPermissions = require('../../authorization.js');

router.get('/', (request, response) => {
  const role = request.session.role;
  contacts.findAll()
    .then((contacts) => {
      if (role === "admin") {
        response.render('contacts/index', { contacts });
      } else if (role === "regular") {
        response.render('contacts/regular', { contacts });
      } else {
        response.redirect('/signup');
      }
    })
    .catch(console.error);
});

router.post('/', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/signup');
  });
});

router.use('/contacts', contactsRoutes);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
