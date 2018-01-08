const db = require('./db');

const createUser = (username, password, role) => {
  return db.one(`INSERT INTO users (username, password, role)
  VALUES ($1, $2, $3)
    RETURNING *`, [username, password, role])
};

const validateUser = (username) => {
  return db.one(`SELECT * FROM users WHERE username=$1`, username);
};

module.exports = { createUser, validateUser };
