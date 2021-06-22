const axios = require('axios')

describe("NFTMarket", function() {
  it("Should interact with the token contract", async function() {

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.deployed()
    const nftContractAddress = nft.address;

    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed()
    const marketAddress = market.address; 

    await nft.createToken("a")
    await nft.createToken("b")
    await nft.createToken("c")

    await nft.setApprovalForAll(marketAddress, true)
  
    await market.createMarketItem(nftContractAddress, 1, 1000)
    await market.createMarketItem(nftContractAddress, 2, 1000)
    await market.createMarketItem(nftContractAddress, 3, 1000)
    
    const [_, userAddress, userAddress2] = await ethers.getSigners();

    await market.connect(userAddress).createMarketSale(nftContractAddress, 1, { value: 1000})
    await market.connect(userAddress2).createMarketSale(nftContractAddress, 2, { value: 1000})
    await market.connect(userAddress2).createMarketSale(nftContractAddress, 3, { value: 1000})

    transaction = await nft.createToken("d")
    transaction = await nft.createToken("e")
    transaction = await nft.createToken("f")
    transaction = await nft.createToken("g")
    transaction = await nft.createToken("h")
    transaction = await nft.createToken("i")

    await market.createMarketItem(nftContractAddress, 4, 1000)
    await market.createMarketItem(nftContractAddress, 5, 1000)
    await market.createMarketItem(nftContractAddress, 6, 1000)
    await market.createMarketItem(nftContractAddress, 7, 1000)
    await market.createMarketItem(nftContractAddress, 8, 1000)
    await market.createMarketItem(nftContractAddress, 9, 1000)

    await market.connect(userAddress2).createMarketSale(nftContractAddress, 4, { value: 1000}) // d
    await market.connect(userAddress2).createMarketSale(nftContractAddress, 5, { value: 1000}) // e
    await market.connect(userAddress2).createMarketSale(nftContractAddress, 6, { value: 1000}) // f
    await market.connect(userAddress2).createMarketSale(nftContractAddress, 7, { value: 1000}) // g

    items = await market.fetchMarketItems()
    // console.log('length: ',items.length)
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      // const tokenMeta = await axios.get(tokenUri)
      let item = {
        price: i.price.toNumber(),
        tokenId: i.price.toNumber(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  });
});
