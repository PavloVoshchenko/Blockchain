const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = "sugar also utility teach theory update tail keep used dilemma best captain";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/f09b600567cf40ec82be511544cee85f`),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: '0.8.17',
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  }
};