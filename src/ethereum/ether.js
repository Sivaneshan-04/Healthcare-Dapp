const details = require('./build/Healthcare.json');
const { ethers } = require("ethers");

const ethereum = window.ethereum;
let contract;
const address = 'ENTER_THE_CONTRACT_ADDRESS';//enter the address of the contract deployed 
if(ethereum){
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(ethereum)
  const walletAddress = accounts[0]    // first account in MetaMask
  const signer = provider.getSigner(walletAddress)
  contract = new ethers.Contract(address,details['abi'],signer);
}
else{
  console.log('Metamask is missing');
}
export default contract;