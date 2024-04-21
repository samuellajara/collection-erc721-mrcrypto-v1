import hre from "hardhat";
import fs from "fs";

// MambaBlack DEPLOYED AT "0x93ece6442b3494d3470b6b3393396d4224b37d07"

async function main() {
  const e7l = await hre.viem.deployContract("EscapeSocialism", [
    "EscapeSocialism",
    "SCS",
    "0xc11606518dbf7d2891797f01b7cb03149cfca899",
  ]);

  const constants = {
    address: e7l.address,
    abi: e7l.abi,
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/MambaBlack.json",
    JSON.stringify(constants)
  );

  console.log("Address: ", e7l.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
