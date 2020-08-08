const Ballot = artifacts.require("Ballot");
var expect = require('chai').expect;
const Web3 = require('web3')

contract("Ballot", (accounts) => {
  let instance;
  let [bob, alice] = accounts;

  function hex(_string) {
    return web3.utils.asciiToHex(_string)
  }

  beforeEach(async () => {
    instance = await Ballot.new([hex('example'), hex('example1'), hex('example2')]);
  });

  it("should have bob as chairperson and add proposals", async () => {
    const chairperson = await instance.chairperson.call();
    const proposalHex = await instance.getProposals(2);
    const proposalName = web3.utils.hexToUtf8(proposalHex);
    expect(chairperson).to.equal(bob);
    expect(proposalName).to.equal('example2');
  });
});
