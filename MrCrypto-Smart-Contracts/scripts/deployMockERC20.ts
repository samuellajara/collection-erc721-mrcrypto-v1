import fs from "fs";
import { ethers } from "hardhat";

// MOCKTOKENERC20 DEPLOYED AT 0xA5a6752F244a34Ff9010Ae7F2C8dFEeA615576e1

async function main() {
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy("TokenMRC", "TMRC", 10000);


  const constants = {
    address: await mockERC20.getAddress(),
    abi: mockERC20.interface.formatJson()
  };

  fs.writeFileSync(
    "../MrCrypto-Frontend/constants/constant_MockTokenERC20.json",
    JSON.stringify(constants)
  );

  console.log("Written constants");
  console.log("Address: ", await mockERC20.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
