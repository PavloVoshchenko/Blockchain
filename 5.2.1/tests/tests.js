const { expect } = require("chai");
const { assert } = require("console");
const Moralis = require("moralis").default;
const fsp = require('fs/promises');

const owner = "0xb157dd801a3eaf846e4bda9cfb855e24a4edc2cd";
const address = "0xe513d498Da46Fa4c89620978B14fbC9C5c0bB86c";
const tokenId = "2"

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjFmNmM0YmQ2LTU2YmYtNDE4Ni1hNWVkLTJhMWI3ZmU5OTRiMyIsIm9yZ0lkIjoiMzU1OTU4IiwidXNlcklkIjoiMzY1ODQ5IiwidHlwZUlkIjoiZjM4OWE1ZDItNWI5ZC00MDg4LWI5NjgtNTE2ZDFiMmUyZTgxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTM5Mjg5MDIsImV4cCI6NDg0OTY4ODkwMn0.FE_lemLnfppcTRv0fyMmI50hfYQuTSgkts6viMQQQ9A"

describe("Test metadata", () => {
  before(async () => {
    await Moralis.start({
      apiKey: apiKey
    });
  });

  it("Get and test metadata", async () => {
    try {
      const attributeJsonData = await fsp.readFile('data/attribute.json', 'utf8');
      const parsedData = JSON.parse(attributeJsonData);

      const response = await Moralis.EvmApi.nft.getNFTMetadata({
        "chain": "0x13881",
        "format": "decimal",
        "normalizeMetadata": true,
        "mediaItems": false,
        "address": address,
        "tokenId": tokenId
      });
      fsp.writeFile("data/nftData.json", JSON.stringify(response.raw, null, "\t"));
     // console.log(response.raw);

      expect(response.raw.owner_of).to.equal(owner);
      expect(response.raw.name).to.equal("snakes");
      expect(response.raw.normalized_metadata.attributes[0].trait_type).to.equal(parsedData.attributes[0].trait_type);
      expect(response.raw.normalized_metadata.attributes[0].value).to.equal(parsedData.attributes[0].value);
      expect(response.raw.normalized_metadata.attributes[1].trait_type).to.equal(parsedData.attributes[1].trait_type);
      expect(response.raw.normalized_metadata.attributes[1].value).to.equal(parsedData.attributes[1].value);
      expect(response.raw.normalized_metadata.attributes[2].trait_type).to.equal(parsedData.attributes[2].trait_type);
      expect(response.raw.normalized_metadata.attributes[2].value).to.equal(parsedData.attributes[2].value);
    } catch (e) {
      console.error(e);
    }
  });

  it("Check NFT Token Transfers", async () => {
    try {

      const response = await Moralis.EvmApi.nft.getNFTTransfers({
        "chain": "0x13881",
        "format": "decimal",
        "address": "0x90d05c6356c49431d763662041e893a4ba6d407c",
        "tokenId": "3"
      });

      fsp.writeFile("data/nftOwner.json", JSON.stringify(response.toJSON(), null, "\t"));
// console.log(response.toJSON());
      expect(response.raw.result[0].contract_type).to.equal('ERC721');
      expect(response.raw.result[0].transaction_type).to.equal('Single');

      expect(response.raw.result[1].from_address).to.equal("0x0000000000000000000000000000000000000000");
      expect(response.raw.result[1].to_address).to.equal("0x84ced12fcbffd844093d14406809b73aa71ad8a7");

      expect(response.raw.result[0].from_address).to.equal("0x84ced12fcbffd844093d14406809b73aa71ad8a7");
      expect(response.raw.result[0].to_address).to.equal("0xb157dd801a3eaf846e4bda9cfb855e24a4edc2cd");

    } catch (e) {
      console.error(e);
    }
  });

  it("Check NFT owner", async () => {
    try {

      const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
        "chain": "0x13881",
        "format": "decimal",
        "address": "0x90d05c6356c49431d763662041e893a4ba6d407c",
        "tokenId": "3"
      });

      fsp.writeFile("data/nftOwner.json", JSON.stringify(response.toJSON(), null, "\t"));
// console.log(response.toJSON());
      expect(response.raw.result[0].contract_type).to.equal('ERC721');
      expect(response.raw.result[0].token_address).to.equal("0x90d05c6356c49431d763662041e893a4ba6d407c");
      expect(response.raw.result[0].owner_of).to.equal(owner);
      expect(response.raw.result[0].token_uri).to.equal("https://ipfs.moralis.io:2053/ipfs/QmNr4if9EiovePb87MmEHCVE7r1CNSn5vYAoaGycTbyK2G/json/3.json");
    } catch (e) {
      console.error(e);
    }
  });
});
