const express = require('express');
const country = require('./../models/country');

const router = express.Router();

router.get('/', async (req, res) => {
    const countries = await country.findAllData({search: req.query.search});
    return res.json(countries);
});

module.exports = router;
