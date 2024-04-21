import hre from "hardhat";
import fs from "fs";

// ERC721 DEPLOYED AT ""

async function main() {
  const mrCrypto = await hre.viem.deployContract("MrCrypto", [
    "MrCrypto",
    "MRC",
  ]);

  const constants = {
    address: mrCrypto.address,
    abi: mrCrypto.abi,
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MrCrypto.json",
    JSON.stringify(constants)
  );

  console.log("Address: ", mrCrypto.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
