var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    res.render(path.join(__dirname, "../client/public", "index.html"));
});

router.get('/api', function (req, res, next) {
    res.send({ message: 'Well Done' });
});

module.exports = router;