var Web3   = require('web3');
var app    = require('../app');

var web3   = new Web3();
var config = app.get('config');
web3.setProvider(config.provider);

module.exports = web3;