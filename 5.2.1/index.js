const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
var fsp = require('fs/promises');

const runApp = async () => {
    try {
        await Moralis.start({
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjFmNmM0YmQ2LTU2YmYtNDE4Ni1hNWVkLTJhMWI3ZmU5OTRiMyIsIm9yZ0lkIjoiMzU1OTU4IiwidXNlcklkIjoiMzY1ODQ5IiwidHlwZUlkIjoiZjM4OWE1ZDItNWI5ZC00MDg4LWI5NjgtNTE2ZDFiMmUyZTgxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTM5Mjg5MDIsImV4cCI6NDg0OTY4ODkwMn0.FE_lemLnfppcTRv0fyMmI50hfYQuTSgkts6viMQQQ9A"
        });
        const address = "0xe513d498Da46Fa4c89620978B14fbC9C5c0bB86c";
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
            "chain": "0x13881",
            "format": "decimal",
            "normalizeMetadata": true,
            "mediaItems": false,
            "address": address,
            "tokenId": "2"
        });
	
        fsp.writeFile("data/nftData.json", JSON.stringify(response.raw, null, "\t"));
        console.log(response.raw);
    } catch (e) {
        console.error(e);
    }
};

runApp();




