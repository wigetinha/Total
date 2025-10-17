const express = require('express');
const { get, getById } = require('../controllers/profile.controller');

const api = express.Router();

api.get('/perfiles', get);
api.get('/perfiles/:id', getById);

module.exports = api;
