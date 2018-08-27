var async = require('async');
var web3 = require('../utils/web3');

var nodeStatus = function(config) {
  var self = this;
  this.conf = config;
  
  this.nbrPeers = -1;
  this.version = "";
  
  this.updateStatus = function() {

    async.waterfall([
      function(callback) {
        web3.version.getNode(function(err, result) {
          self.version = result;
          callback(err);
        });
      }, function(callback) {
        web3.net.getPeerCount(function(err, result) {
          self.nbrPeers = result;
          callback(err);
        });
      }
    ], function(err) {
      if (err) {
        console.log("Error updating node status:", err)
      }
      
      setTimeout(self.updateStatus, 1000 * 60 * 60);
    })
  }
  
  this.updateStatus();
}
module.exports = nodeStatus;