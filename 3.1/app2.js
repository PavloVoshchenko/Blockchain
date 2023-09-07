const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const mnemonic = "sugar also utility teach theory update tail keep used dilemma best captain";

const infuraUrl = "https://sepolia.infura.io/v3/f09b600567cf40ec82be511544cee85f";
const mumbaiUrl = "https://rpc-mumbai.maticvigil.com/v1/3de62dfde1c0583b9986f38904b84bf5d813df96"

//BIP44
const derivationPath = "m/44'/60'/0'/0";

function createProvider(url){
const provider = new HDWalletProvider({
    mnemonic:mnemonic,
    providerOrUrl: url,
    derivationPath: derivationPath
  });
  return provider;
}

const providerEth = new createProvider(infuraUrl);
const providerMatic = new createProvider(mumbaiUrl);

const Ether = new Web3(infuraUrl);
const Matic = new Web3(mumbaiUrl);

  async function getBalances() {
    for (let i = 0; i < 10; i++) {
    
      const address = providerEth.getAddresses()[i];
      const balanceWei = await Ether.eth.getBalance(address);
      const balanceEther = await Ether.utils.fromWei(balanceWei, 'ether');
      console.log(`Balance ${address}: ${balanceEther} ETH`);

      const addressM = providerMatic.getAddresses()[i];
      const balanceWeiM = await Matic.eth.getBalance(addressM);
      const balanceM = await Matic.utils.fromWei(balanceWeiM, 'ether');
      console.log(`Balance ${address}: ${balanceM} MATIC`);
    }
  }
  
  getBalances();