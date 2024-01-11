import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const MambaBlack = await ethers.getContractFactory("MambaBlack");
  const mbb = await MambaBlack.deploy(
    "MambaBlack",
    "MBB",
    "0x175BCa235261dF2f40f639CB5E34856868545A15"
  );

  await mbb.deployed();
  console.log(mbb.address);
  await mbb.mint(1);

  const constants = {
    address: mbb.address,
    abi: mbb.interface.format(ethers.utils.FormatTypes.json),
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MambaBlack.json",
    JSON.stringify(constants)
  );
  console.log("Written constants");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
