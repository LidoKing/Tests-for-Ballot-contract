const Ballot = artifacts.require("Ballot")
const Web3 = require('web3')

function hex(_string) {
  return web3.utils.asciiToHex(_string)
}

module.exports = function (deployer) {
  deployer.deploy(Ballot, [hex('example'), hex('example1'), hex('example2')])
}
