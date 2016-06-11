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

  request.post('generator', function(error, response, body) {
    if(error) {
      next(error);
    } else if(response.statusCode == 200) {
      res.redirect('/' + id);
    }
  });
});

// GET new data.
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('live', { id: id });
});

// POST new data.
router.post('/:id', function(req, res, next) {
  var msg = {
    id: req.params.id,
    type: req.body.type,
    data: req.body.data,
    time: req.body.time
  }

  // send new data to correct listeners
  var listeners = req.listeners[msg.id];
  if(listeners) {
    for(listener of listeners) {
      listener.emit('new data' , msg);
    }
  }

  res.send(200);
});

module.exports = router;
