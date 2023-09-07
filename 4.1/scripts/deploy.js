const { ethers } = require("hardhat");

async function main() {
  const LotteryFactory = await ethers.getContractFactory("Lottery");
  const lottery = await LotteryFactory.deploy();
  await lottery.deployed();

  console.log("Lottery deployed to:", lottery.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});