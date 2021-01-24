const express = require('express');
const zip = require('./../models/zip');

const router = express.Router();

router.get('/', async (req, res) => {
    const zips = await zip.findAllData({search: req.query.search});
    return res.json(zips);
});

module.exports = router;
