import hre from "hardhat";
import fs from "fs";

// MambaBlack DEPLOYED AT "0x4e3534f28938180e13a3b9efda08cea0d5d0751c"

async function main() {
  const e7l = await hre.viem.deployContract("EscapeSocialism", [
    "EscapeSocialism",
    "SCS",
    "0x7fb498a6a1cd614600e2fff193b514e83a519b0c",
  ]);

  const constants = {
    address: e7l.address,
    abi: e7l.abi,
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/EscapeSocialism.json",
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
