const { expect } = require("chai");
const ethers = require('ethers');
const fsp = require('fs/promises');

const owner = "0xb157dd801a3eaf846e4bda9cfb855e24a4edc2cd";
const contractAddress = '0xe513d498Da46Fa4c89620978B14fbC9C5c0bB86c';

describe("Test metadata", () => {
    before(async () => {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        const contract = new ethers.Contract(contractAddress, ['function tokenURI(uint256 tokenId) public view returns (string)'], provider);
        const tokenId = 1;
        const tokenUri = await contract.tokenURI(tokenId);
        const uri = tokenUri.replace('ipfs:/', 'https://ipfs.io/ipfs');

        const block = await provider.getBlock('latest');
        
        fetch(`${uri}`)
            .then(res => res.json())
            .then(res => fsp.writeFile("data/attribute.json", JSON.stringify(res)))
    });

    it("Get and test metadata", async () => {

        try {
            const parsedData = JSON.parse(await fsp.readFile('data/attribute.json', 'utf8'));
            console.log(parsedData);
            expect(parsedData.name).to.equal("snx #1");
            expect(parsedData.attributes[0].trait_type).to.equal("bg");
            expect(parsedData.attributes[1].trait_type).to.equal("body");
            expect(parsedData.attributes[2].trait_type).to.equal("head");
            expect(parsedData.attributes[0].value).to.equal("bg_7");
            expect(parsedData.attributes[1].value).to.equal("body_5");
            expect(parsedData.attributes[2].value).to.equal("head_4");

        } catch (e) {
            console.error(e);
        }
    });

    it("Get and test owner", async () => {

        try {
            

            // Получение хеша последней транзакции из блока
            const lastTransactionHash = block.transactions[0]; // Первая транзакция в блоке
          
            // Получение информации о последней транзакции по ее хешу
            const lastTransaction = await provider.transactionResponse.data(lastTransactionHash);
          
            console.log('Последняя транзакция:', lastTransaction);

        } catch (e) {
            console.error(e);
        }
    });
});
