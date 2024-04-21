import hre from "hardhat";
import fs from "fs";

// MambaBlack DEPLOYED AT "0x007566e2d810ebe752f16b1af931322106398d1d"

async function main() {
  const e7l = await hre.viem.deployContract("DreamBig", [
    "DreamBig",
    "DMB",
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
