require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
  }),
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  rolling: true,
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 60000000,
  },
}));

app.use(middlewares.setDefaultResponseLocals);

app.use('/', routes);

app.use((request, response) => {
  response.render('common/not_found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
