import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const DreamBig = await ethers.getContractFactory("DreamBig");
  const dmb = await DreamBig.deploy(
    "DreamBig",
    "DMB",
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await dmb.deployed();
  console.log(dmb.address);
  await dmb.mint(1);

  const constants = {
    address: dmb.address,
    abi: dmb.interface.format(ethers.utils.FormatTypes.json),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_DreamBig.json",
    JSON.stringify(constants)
  );
  console.log("Written constants");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
