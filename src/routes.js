const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Validator

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const routes = express.Router();

// SESSION CONTROLLER
routes.post('/sessions', SessionController.create); // Login.

// ONG CONTROLLER
routes.get('/ongs', OngController.index); // List of ONGs.
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(14),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}) ,OngController.create); // Register new ONG.

// PROFILE CONTROLLER
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}),ProfileController.index); // List of specific case of one specific ONG.

// INCIDENT CONTROLLER
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}),IncidentController.index); // List of incidents.
routes.post('/incidents', IncidentController.create); // Create incident.
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),IncidentController.delete) // Delete incident.

module.exports = routes;
