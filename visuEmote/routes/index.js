var express = require('express');
var router = express.Router();
var analyze = require('./analyze');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'visuEmote' });
});

module.exports = router;
