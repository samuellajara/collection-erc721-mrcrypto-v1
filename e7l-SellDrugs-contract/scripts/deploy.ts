import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const SellDrugs = await ethers.getContractFactory("SellDrugs");
  const sld = await SellDrugs.deploy("SellDrugs", "SLD", "0xC61046e4203bb40943525973EF7Dc170F4eeFb96");

  await sld.deployed();
  console.log(sld.address);
  await sld.mint(1);

  const constants = {
    address: sld.address,
    abi: sld.interface.format(ethers.utils.FormatTypes.json),
  };

  fs.writeFileSync(
    "../mrcrypto-frontend/constants/constantSLD.json",
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
