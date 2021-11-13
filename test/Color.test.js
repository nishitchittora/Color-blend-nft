const Color = artifacts.require('./Color.sol');

require("chai")
  .use(require("chai-as-promised"))
  .should()

contract("Color", (accounts) => {
    let contract;

    before(async()=>{
       contract = await Color.deployed();

    })

    describe("deployment", async() =>{
      it("Deployment Successful", async() =>{
          const address = contract.address;
          console.log(address);
          assert.notEqual(address, "");
          assert.notEqual(address, null);
          assert.notEqual(address, "0x0");
          assert.notEqual(address, undefined);
      })

      it("has a name", async() =>{
          const name = await contract.name();
          assert.equal(name, "Color");
      })
      it("has a symbol", async() =>{
          const name = await contract.symbol();
          assert.equal(name, "COL");
      })

    })

    describe("minting", async()=>{
        it("create a new color", async()=>{
            const result = await contract.mint("#ffffff");
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event.tokenId.toNumber(), 0, "id is correct");
            assert.equal(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
            assert.equal(event.to, accounts[0], "to is correct");

            await contract.mint("#ffffff").should.be.rejected;
        })
    })

    describe("indexing", async()=>{
        it("listing color", async()=>{
            await contract.mint("#FFDDDD");
            await contract.mint("#FF0000");
            await contract.mint("#FF1111");
            await contract.mint("#FF2222");
            let totalSupply = await contract.totalSupply();
            let color, result = [];
            for (var i=0; i< totalSupply; i++){
                color = await contract.colors(i);
                result.push(color);
            }
            let expected = ["#ffffff", "#FFDDDD", "#FF0000", "#FF1111", "#FF2222"]
            assert.equal(result.join(','), expected.join(','))
        })
    })

})
