# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
# BuyMeACoffee-Contract

BuyMeACoffee solidity contract
This repo contains a contract that implements tipping functionality.

Install dependencies with npm install.

Set up by creating a .env file, and filling out these variables:

SEPOLIA_URL="your Alchemy RPC URL"
SEPOLIA_API_KEY="your Alchemy API key"
PRIVATE_KEY="your wallet private key"
You can get an Alchemy RPC URL for free at [www.alchemy.com](https://dashboard.alchemy.com/apps)

## Issues encountered
``` deployed() ``` got deprecated for ``` waitForDeployment()```
had to create a new variable to accomodate the async function ``` const contrAddress = await buyMeACoffee.getAddress()```
otherwise ``` buyMeACoffee.address``` was returning undefined

## Be very careful with exporting your private key
Deploy your contract with:
```
npx hardhat run scripts/deploy.js
```
Run an example buy coffee flow locally (i.e. deploy locally - this wouldn't work on the test network) with:
```
npx hardhat run scripts/buy-coffee.js
```
Once you have a contract deployed to Sepolia testnet, grab the contract address and update the contractAddress variable in scripts/withdraw.js, then:

npx hardhat run scripts/withdraw.js
will allow you to withdraw any tips stored on the contract.
