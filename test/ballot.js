const Ballot = artifacts.require("Ballot");
var expect = require('chai').expect;

contract("Ballot", (accounts) => {
  let instance;
  let [bob, alice] = accounts;
  beforeEach(async () => {
    instance = await Ballot.new(['0x0']);
  });

  it("should have bob as chairperson and a proposal", async () => {
    const chairperson = await instance.chairperson.call();
    const proposalName = await instance.getProposals(0);
    expect(chairperson).to.equal(bob);
    expect(proposalName).to.equal('0x0');
  });
});
