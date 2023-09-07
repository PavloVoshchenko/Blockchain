const ethers = require('ethers');
const fsp = require('fs/promises');

async function getNFTMetadata() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
  //ERC-721
  const contractAddress = '0xe513d498Da46Fa4c89620978B14fbC9C5c0bB86c';
  // Получение объекта контракта ERC-721
  const contract = new ethers.Contract(contractAddress, ['function tokenURI(uint256 tokenId) public view returns (string)'], provider);
  const tokenId = 1;

  const tokenUri = await contract.tokenURI(tokenId);
  console.log(`URI metadata ID ${tokenId}: ${tokenUri}`);
  const uri = tokenUri.replace('ipfs:/', 'https://ipfs.io/ipfs');
  console.log(uri);

  fetch(`${uri}`)
  .then(res => res.JSON())
  .then(res => fsp.writeFile("data/attribute.json", JSON.stringify(res, null, "\t")))
}

getNFTMetadata();
