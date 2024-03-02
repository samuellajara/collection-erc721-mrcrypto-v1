import { ethers } from "hardhat";
import fs from "fs";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MrCrypto = await ethers.getContractFactory("MrCrypto");
  const mrc = await MrCrypto.deploy("MrCrypto", "MRC");
 
  const constants = {
    address: await mrc.getAddress(),
    abi: mrc.interface.formatJson()
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MrCrypto.json",
    JSON.stringify(constants)
  );

  console.log("Written constants");
  console.log("Address: ", await mrc.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
