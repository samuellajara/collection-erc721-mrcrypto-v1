import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const DreamBig = await ethers.getContractFactory("DreamBig");
  const dmb = await DreamBig.deploy(
    "DreamBig",
    "DMB",
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await dmb.mint();

  const constants = {
    address: await dmb.getAddress(),
    abi: dmb.interface.formatJson(),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_DreamBig.json",
    JSON.stringify(constants)
  );
  console.log("Written constants");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
