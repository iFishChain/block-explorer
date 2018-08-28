var BigNumber = require('bignumber.js');
var web3      = require('./web3');

function formatAmount(amount) {
  return new BigNumber(web3.fromWei(amount)).toFixed() + " iFish";
}

module.exports = formatAmount;