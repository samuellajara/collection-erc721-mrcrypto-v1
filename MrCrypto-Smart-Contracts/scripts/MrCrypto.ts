import hre from "hardhat";
import fs from "fs";

// ERC721 DEPLOYED AT SEPOLIA "0xc11606518dbf7d2891797f01b7cb03149cfca899"
// ERC721 DEPLOYED AT AMOY "0x7fb498a6a1cd614600e2fff193b514e83a519b0c"

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
    "../MrCrypto-Frontend/constants/MrCrypto.json",
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
