import { ethers } from "hardhat";

async function main() {
  const MrCrypto = await ethers.getContractFactory("MrCrypto");
  const mrc = await MrCrypto.attach(
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await mrc.reveal();
  await mrc.mint(1, { value: ethers.utils.parseEther("0.000001") });

  console.log(await mrc.tokenURI(1));
  console.log(mrc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
