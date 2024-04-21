import { ethers } from "hardhat";
import fs from "fs";

// ERC721 DEPLOYED AT 0x73938601dC3FC022d90a29f732a773c003761E8C

async function main() {

  const MrCrypto = await ethers.getContractFactory("MrCrypto");
  const mrc = await MrCrypto.deploy("MrCrypto", "MRC");
  await mrc.deploymentTransaction();
 /* const constants = {
    address: await mrc.getAddress(),
    abi: mrc.interface.formatJson()
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MrCrypto.json",
    JSON.stringify(constants)
  );

  console.log("Written constants");
  console.log("Address: ", await mrc.getAddress());
*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
