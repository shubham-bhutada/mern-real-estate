const express = require('express');
const { findAll } = require('../controllers/list.controller');
const { getListings, getListing } = require('../controllers/listing.controller');

const router = express.Router();

router.get('/test', findAll)
router.get("/get", getListings);
router.get("/:id", getListing);

module.exports = router;