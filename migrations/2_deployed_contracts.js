const DigitalBallot = artifacts.require('DigitalBallot')

module.exports = function (deployer) {
  deployer.deploy(DigitalBallot)
}
