const ethers = require('ethers');
const details = require('./build/Healthcare.json');


const rpcURL = 'INSERT_RPC_URL'; //insert your rpc url
const privateKey = 'INSERT_PRIVATE_KEY'; // insert your wallet account private key

// Initialize the wallet and provider
const wallet = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcBatchProvider(rpcURL));

async function deployContract() {
  const factory = new ethers.ContractFactory(details['abi'], details['bytecode'], wallet);

  // Deploy the contract
  const contract = await factory.deploy();


  return contract.address;
}

deployContract().then((contractAddress) => {
  console.log('Contract deployed at address:', contractAddress);
});
