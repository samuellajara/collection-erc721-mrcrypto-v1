import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import dotenv from "dotenv";
import "solidity-coverage";
import "hardhat-gas-reporter";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    polygonTestnet: {
      url: process.env.PROVIDER_URL_AMOY!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      polygonTesnet: process.env.POLYGONSCAN!, // Your API key for Plygonscan
    },
  },
  gasReporter: {
    currency: "EUR",
    gasPrice: 21,
    enabled: true,
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify.dev/server",
  },
};

export default config;
