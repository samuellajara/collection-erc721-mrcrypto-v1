import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: process.env.PROVIDER_URL_AMOY!,
      accounts: [process.env.PRIVATE_KEY_2!],
    },
    sepolia: {
      url: process.env.PROVIDER_URL_SEPOLIA!,
      accounts: [process.env.PRIVATE_KEY_2!],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN!, // Your API key for Plygonscan
      sepolia: process.env.ETHERSCAN!,
    },
  },
};

export default config;
