const router = require('express').Router();
const loginRoutes = require('./signup');
const middlewares = require('../middlewares');

router.get('/signup', (request, response, next) => {
  response.status(200);
  response.render('login/signup');
  next();
});

router.use('/login', loginRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
