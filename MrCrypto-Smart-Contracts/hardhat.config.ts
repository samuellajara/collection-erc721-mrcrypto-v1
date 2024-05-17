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
      chainId: 80002, // El Chain ID de tu red personalizada
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
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://www.oklink.com/amoy",
        },
      },
    ],
  },
};

export default config;
