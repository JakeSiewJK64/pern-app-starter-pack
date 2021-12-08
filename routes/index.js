var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api', function (req, res, next) {
    res.render({ message: 'Well Done' });
});

module.exports = router;