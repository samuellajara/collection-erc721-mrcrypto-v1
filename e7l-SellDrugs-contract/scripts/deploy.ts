import { ethers } from "hardhat";

async function main() {
  const E7LSellDrugs = await ethers.getContractFactory("E7LSellDrugs");
  const sdg = await E7LSellDrugs.deploy("E7LSellDrugs", "SDG", "0xC61046e4203bb40943525973EF7Dc170F4eeFb96");

  await sdg.deployed();
  console.log(sdg.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
