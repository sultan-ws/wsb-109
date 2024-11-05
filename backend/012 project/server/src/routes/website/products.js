const express = require('express');
const { activeColors, activeProductWebsite } = require('../../controllers/controllers');

const websiteProductRoutes = express.Router();

websiteProductRoutes.get('/active-products', activeProductWebsite);

module.exports = websiteProductRoutes;