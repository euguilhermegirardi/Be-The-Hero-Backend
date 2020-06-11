const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;

// SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
// NoSQL: MongoDB, CouchDB, etc...

// SQLite
// Driver: SELECT * FROM users  X
// Query Builder: table('users').select('*').where()  <==
// Gonna use Knex.js
