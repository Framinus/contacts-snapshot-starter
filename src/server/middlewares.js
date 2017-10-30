// renders handler if there is a server error. will make a cuter one.
const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

// logs routing errors to the console.
const logErrors = (error, request, response, next) => {
  console.error(error.stack);
  next(error);
};

// renders a 404 response for a missing route.
const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found');
};

// i don't know what this does yet.
const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = '';
  next();
};

module.exports = { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals };
