var request = require('request');
var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

// POST new tps generator.
router.post('/generate', function(req, res, next) {
  var method = req.body.method.toLowerCase();
  var url = req.body.url;
  var numTransactions = req.body.numTransactions;
  var tps = req.body.tps;

  request.post('generator:3000/generate', function(error, response, body) {
    if(error) {
      next(error);
    } else if(response.statusCode == 200) {
      var variables = {
        request: method + ' ' + url
      }
      res.render('live', { id: id });
    }
  });
});

module.exports = router;
