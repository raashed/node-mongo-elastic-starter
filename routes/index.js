const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        'message': 'hello world'
    });
});

router.use('/countries', require("./country"));
router.use('/states', require("./state"));
router.use('/cities', require("./city"));
router.use('/zips', require("./zip"));

module.exports = router;
