import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MambaBlack = await ethers.getContractFactory("MambaBlack");
  const e7l = await MambaBlack.deploy(
    "MambaBlack",
    "MBB",
    "0xb7B09B8a9Dab82218a04776Aa7f65F3E9f856107"
  );

  const constants = {
    address: await e7l.getAddress(),
    abi: e7l.interface.formatJson(),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MambaBlack.json",
    JSON.stringify(constants)
  );

  console.log("Written constants");
  console.log("Address: ", await e7l.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
