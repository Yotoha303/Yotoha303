// const { network } = require('hardhat');
require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.21",
  paths: {
    sources: "./src/MyContract",
    tests: "./src/tests",
    cache: "./src/cache",
    artifacts: "./src/artifacts"
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    }
  }
};
