import hre from "hardhat";
import fs from "fs";

// ERC721 DEPLOYED AT "0xc11606518dbf7d2891797f01b7cb03149cfca899"

async function main() {
  const marketplace = await hre.viem.deployContract("E7LMarketplace", [
    "0xC11606518dBf7D2891797f01b7cB03149cFcA899",
    "0xf5b13b56C608ddeaB0fCC9b98d24064cdB264748",
  ]);

  const constants = {
    address: marketplace.address,
    abi: marketplace.abi,
  };

 /* fs.writeFileSync(
    "../MrCrypto-Frontend/constants/MrCrypto.json",
    JSON.stringify(constants)
  );*/

  console.log("Address: ", marketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
