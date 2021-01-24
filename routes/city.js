const express = require('express');
const city = require('./../models/city');

const router = express.Router();

router.get('/', async (req, res) => {
    const cities = await city.findAllData({search: req.query.search});
    return res.json(cities);
});

module.exports = router;
