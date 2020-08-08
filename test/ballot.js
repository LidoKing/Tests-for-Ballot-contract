const Ballot = artifacts.require("Ballot");
var expect = require('chai').expect;
const Web3 = require('web3')

contract("Ballot", (accounts) => {
  let instance;
  let [bob, alice, sam] = accounts;

  function hex(_string) {
    return web3.utils.asciiToHex(_string)
  }

  beforeEach(async () => {
    instance = await Ballot.new([hex('example'), hex('example1'), hex('example2')]);
  });

  it("should have bob as chairperson and initialized with proposals", async () => {
    const chairperson = await instance.chairperson.call();
    const proposalHex = await instance.getProposals(2);
    const proposalName = web3.utils.hexToUtf8(proposalHex);
    expect(chairperson).to.equal(bob);
    expect(proposalName).to.equal('example2');
  });

  it("should give alice the right to vote but not sam", async () => {
    const result = await instance.giveRightToVote(alice, {from: bob});
    const aliceWeight = await instance.getVoterWeight(alice);
    const samWeight = await instance.getVoterWeight(sam);
    expect(aliceWeight.toNumber()).to.equal(1);
    expect(samWeight.toNumber()).to.equal(0);
  });

  it("should allow voters to delegate", async () => {
    const giveRight = await instance.giveRightToVote(alice, {from: bob});
    const giveRight1 = await instance.giveRightToVote(sam, {from: bob});
    const delegate = await instance.delegate(alice, {from:sam});
    const aliceWeight = await instance.getVoterWeight(alice);
    expect(aliceWeight.toNumber()).to.equal(2);
  });
});
