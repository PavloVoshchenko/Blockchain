const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  let Lottery;
  let owner;
  let participant1;
  let participant2;
  let participant3;

  beforeEach(async function () {
    [owner, participant1, participant2, participant3] = await ethers.getSigners();

    const LotteryFactory = await ethers.getContractFactory("Lottery");
    Lottery = await LotteryFactory.deploy();
    await Lottery.deployed();
  });

  it("should select a winner and distribute the correct prize amount", async function () {
    const ticketPrice = ethers.utils.parseEther("0.5");
  
    await Lottery.connect(participant1).enter({ value: ticketPrice });
    await Lottery.connect(participant2).enter({ value: ticketPrice });
    await Lottery.connect(participant3).enter({ value: ticketPrice });
  
    const winnerBalanceBefore = await ethers.provider.getBalance(participant1.address);
  
    await Lottery.selectWinner();
  
    const winnerBalanceAfter = await ethers.provider.getBalance(participant1.address);
    const prizeAmount = ticketPrice.mul(3);
  
    expect(winnerBalanceAfter.sub(winnerBalanceBefore)).to.equal(prizeAmount);
  });

  it("should not allow the owner to participate", async function () {
    await expect(Lottery.connect(owner).enter({ value: ethers.utils.parseEther("0.5") }))
      .to.be.revertedWith("Owner cannot be participate");
  });

  it("should require the correct ticket price", async function () {
    await expect(Lottery.connect(participant1).enter({ value: ethers.utils.parseEther("0.3") }))
      .to.be.revertedWith("Ticket price >= 0.5 ether");
  });

  it("should require at least 3 participants to select a winner", async function () {
    await expect(Lottery.selectWinner())
      .to.be.revertedWith("Need 3 or more participants");
  });

  it("should allow participants to enter the lottery", async function () {
    const ticketPrice = ethers.utils.parseEther("0.5");

    await Lottery.connect(participant1).enter({ value: ticketPrice });
    await Lottery.connect(participant2).enter({ value: ticketPrice });

    const participants = await Lottery.getParticipants();
    expect(participants).to.have.lengthOf(2);
    expect(participants).to.include(participant1.address);
    expect(participants).to.include(participant2.address);
  });
});
