import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const EscapeSocialism = await ethers.getContractFactory("EscapeSocialism");
  const scs = await EscapeSocialism.deploy(
    "EscapeSocialism",
    "SCS",
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await scs.deployed();
  console.log(scs.address);
  await scs.mint();

  const constants = {
    address: scs.address,
    abi: scs.interface.format(ethers.utils.FormatTypes.json),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_EscapeSocialism.json",
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
