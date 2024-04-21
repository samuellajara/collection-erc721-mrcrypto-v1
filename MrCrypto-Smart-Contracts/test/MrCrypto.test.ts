import hre from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { parseEther } from "viem";

// A deployment function to set up the initial state
const deploy = async () => {
  const mrCrypto = await hre.viem.deployContract("MrCrypto", [
    "MrCrypto",
    "MRC",
  ]);
  return { mrCrypto };
};

describe("MrCrypto Contracts Tests", function () {
  it("Mint a NFT", async function () {
    // Load the contract instance using the deployment function
    const { mrCrypto } = await loadFixture(deploy);

    // Call the contract to mint
    const ONE_GWEI = parseEther("0.000001");
    await mrCrypto.write.mint([BigInt(1)], { value: ONE_GWEI });
  });
});
