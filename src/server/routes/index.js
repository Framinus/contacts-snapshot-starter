const router = require('express').Router();
const contactsRoutes = require('./contacts');
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const signupRoute = require('./signup');
const loginRoute = require('./login');
const hasPermissions = require('../../authorization.js');

router.get('/', (request, response) => {
  const role = request.session.role;
  console.log('role: ', role);
  if (hasPermissions(role, 'viewContacts')) {
    contacts.findAll()
      .then((contacts) => {
        response.render('contacts/index', { contacts });
      })
      .catch(console.error);
  } else {
    response.redirect('/');
  }
});

router.use('/contacts', contactsRoutes);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
