var express = require('express');
var router = express.Router();

var async = require('async');
var web3 = require('../utils/web3');

router.get('/', function(req, res, next) {
  
  var config = req.app.get('config');
  
  async.waterfall([
    function(callback) {
      web3.eth.getBlock("latest", false, function(err, result) {
        callback(err, result);
      });
    }, function(lastBlock, callback) {
      var blocks = [];
      
      var blockCount = 50;
      
      if (lastBlock.number - blockCount < 0) {
        blockCount = lastBlock.number + 1;
      }
      
      async.times(blockCount, function(n, next) {
        web3.eth.getBlock(lastBlock.number - n, true, function(err, block) {
          next(err, block);
        });
      }, function(err, blocks) {
        callback(err, blocks);
      });
    }
  ], function(err, blocks) {
    if (err) {
      return next(err);
    }
    
    var txs = [];
    blocks.forEach(function(block) {
      block.transactions.forEach(function(tx) {
        if (txs.length === 10) {
          return;
        }
        txs.push(tx);
      });
    });
    res.render('index', { blocks: blocks, txs: txs });
  });
  
});

module.exports = router;
