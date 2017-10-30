const router = require('express').Router();
const middlewares = require('../middlewares');

router.get('/signup', (request, response, next) => {
  response.status(200);
  response.render('login/signup');
});

router.use('/login');

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
