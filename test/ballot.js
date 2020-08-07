const Ballot = artifacts.require("Ballot");

contract("Ballot", function() {
  it("should assert true", async function(done) {
    await Ballot.deployed();
    assert.isTrue(true);
    done();
  });
});
