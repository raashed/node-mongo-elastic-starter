const express = require('express');
const state = require('./../models/state');

const router = express.Router();

router.get('/', async (req, res) => {
    const states = await state.findAllData({search: req.query.search});
    return res.json(states);
});

module.exports = router;
