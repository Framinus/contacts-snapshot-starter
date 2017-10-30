const router = require('express').Router();
const contactsRoutes = require('./contacts');
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => { response.render('contacts/index', { contacts }); })
    .catch(error => next(error));
});

router.post('/', (request, response, next) => {
  const { username, password, role } = request.body;
});

router.use('/contacts', contactsRoutes);
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
