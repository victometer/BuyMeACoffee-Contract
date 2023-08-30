const hre = require("hardhat");

async function main() {
    const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee');
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.waitForDeployment();
    const contrAddress = await buyMeACoffee.getAddress()
    console.log('BuyMeACoffee deployed to ', contrAddress);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });