import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const SellDrugs = await ethers.getContractFactory("SellDrugs");
  const sld = await SellDrugs.deploy(
    "SellDrugs",
    "SLD",
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await sld.deployed();
  console.log(sld.address);
  await sld.mint(1);

  const constants = {
    address: sld.address,
    abi: sld.interface.format(ethers.utils.FormatTypes.json),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_SellDrugs.json",
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
