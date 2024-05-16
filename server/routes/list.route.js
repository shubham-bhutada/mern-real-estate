const express = require('express');
const { findAll } = require('../controllers/list.controller');
const { getListings } = require('../controllers/listing.controller');

const router = express.Router();

router.get('/test', findAll)
router.get("/get", getListings);

module.exports = router;
