const contacts = require('../../models/contacts')

const router = require('express').Router()
const session = require('express-session');

// renders page for new contact
router.get('/new', (request, response) => {
  const sess = request.session;
  if (sess.role === 'admin') {
    response.render('contacts/new');
  } else {
    response.status(403);
    response.render('common/forbidden');
  }
});

// posts new contact to the server
router.post('/', (request, response, next) => {
  contacts.create(request.body)
    .then((contact) => {
      if (contact) {
        return response.redirect(`/contacts/${contact[0].id}`);
      }
      next();
    })
    .catch(error => next(error));
});

// gets a single contact by id.
router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  if (!contactId || !/^\d+$/.test(contactId)) {
    return next();
  }
  contacts.findById(contactId)
    .then((contact) => {
      if (contact) {
        return response.render('contacts/show', { contact });
      }
      next();
    })
    .catch(error => next(error));
});

// deletes a single contact by id.
router.delete('/:contactId', (request, response, next) => {
  const sess = request.session;
  if (sess.role === 'admin') {
    const contactId = request.params.contactId;
    contacts.destroy(contactId)
      .then((contact) => {
        if (contact) {
          return response.redirect('/');
        }
        next();
      })
      .catch(error => next(error));
  } else {
    response.status(403);
    response.render('common/forbidden');
  }
});

// renders the search page and results.
router.get('/search', (request, response, next) => {
  const query = request.query.q;
  contacts.search(query)
    .then((contacts) => {
      if (contacts) {
        return response.render('contacts/index', { query, contacts });
      }
      next();
    })
    .catch(error => next(error));
});

module.exports = router;
