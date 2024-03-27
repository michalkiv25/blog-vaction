const express = require('express');
const router = express.Router();

const dataMongo = require('../controllers/data_dataMongo');
const dataContact = require('../controllers/data_contact');
const weatherApiCountry = require('../controllers/data_weatherapi');
const informationCountries = require('../controllers/data_restcountries');



router.get('/data', dataMongo.dataGetMongo);

router.post('/contact', dataContact.dataPostContact);

router.post('/weatherCountry', weatherApiCountry.dataWeatherapi);

router.post('/informationCountries',informationCountries.restcountries );

module.exports = router;