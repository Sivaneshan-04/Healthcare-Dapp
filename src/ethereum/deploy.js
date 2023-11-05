const ethers = require('ethers');
const details = require('./build/Healthcare.json');


const rpcURL = 'https://sepolia.infura.io/v3/6502f2cd899b47ca97f8a3a271e5b1f0';
const privateKey = '82d2b31ddaad578519384f74d6aa48f8375de997c056228efb01cc1ff4636e45';

// Initialize the wallet and provider
const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcBatchProvider(rpcURL));

// Deploy the contract
async function deployContract() {
  const factory = new ethers.ContractFactory(details['abi'], details['bytecode'], wallet);

  // Deploy the contract
  const contract = await factory.deploy();


  return contract.address;
}

deployContract().then((contractAddress) => {
  console.log('Contract deployed at address:', contractAddress);
});
