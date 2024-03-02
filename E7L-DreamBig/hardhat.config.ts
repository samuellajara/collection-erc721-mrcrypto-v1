import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "solidity-coverage";
import "hardhat-gas-reporter";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: process.env.PROVIDER_URL_GOERLI!,
      accounts: [process.env.PRIVATE_KEY!],
    },
    polygonMumbai: {
      url: process.env.PROVIDER_URL_MUMBAI!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN!, // Your API key for Plygonscan
      goerli: process.env.ETHERSCAN!, // Your API key for Etherscan
    },
  },
  gasReporter: {
    currency: "EUR",
    gasPrice: 21,
    enabled: true,
  },
};

export default config;
