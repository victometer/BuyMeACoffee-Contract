const hre = require("hardhat");

//Returns the ether balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

//Logs ether balances for a list of addresses
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

//Logs the memos stored on chain
async function printMemos(memos) {
  console.log(memos);
  for (const memo in memos) {
    const timestamp = memo[1];
    const tipper = memo[2];
    const tipperAddress = memo[0];
    const message = memo[3];
    console.log(`At ${timestamp}, ${tipper}, (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {

  try {
    // Get example accounts
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // Get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee');
  console.log('Got contract Factory!')
  const buyMeACoffee = await BuyMeACoffee.deploy();
  console.log('Contract Ready for Deployment!')


  //Deploy contract
  await buyMeACoffee.waitForDeployment();
  const contrAddress = await buyMeACoffee.getAddress()
  console.log('BuyMeACoffee deployed to ', contrAddress );

  // Check balances before coffee purchase
  const addresses = [owner.address, tipper.address, contrAddress];
  console.log('== start ==');
  await printBalances(addresses);

  // Buy the owner a coffee
  const tip = { value: hre.ethers.parseEther('1') };
  await buyMeACoffee.connect(tipper).buyCoffee('Carol', 'Thanks!', tip)
  await buyMeACoffee.connect(tipper2).buyCoffee('Vitto', 'Great job!', tip)
  await buyMeACoffee.connect(tipper3).buyCoffee('Kay', 'Yay!', tip)

  // Check balances after coffee purchase
  console.log('== bought coffee ==');
  await printBalances(addresses);

  // Withdraw funds
  await buyMeACoffee.connect(owner).withdrawTips()

  // Check balances after withdraw
  console.log('== withdraw tips ==');
  await printBalances(addresses);

  // Read all the memos left for the owner
  console.log('== memos ==');
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exitCode = 1;
  }
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });



   // const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  // const buyMeACoffee = await BuyMeACoffee.deploy();
  // await buyMeACoffee.waitForDeployment();
  // console.log("BuyMeACoffee deployed to ", buyMeACoffee.getAddress());