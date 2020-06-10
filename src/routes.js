const express = require('express');
const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const routes = express.Router();

routes.post('/sessions', SessionController.create); // Login.

routes.get('/ongs', OngController.index); // List of ONGs.
routes.post('/ongs', OngController.create); // Register new ONG.

routes.get('/profile', ProfileController.index); // List of specific case of one specific ONG.

routes.get('/incidents', IncidentController.index); // List of incidents.
routes.post('/incidents', IncidentController.create); // Create incident.
routes.delete('/incidents/:id', IncidentController.delete) // Delete incident.

module.exports = routes;
