const details = require('./build/Healthcare.json');
const { ethers } = require("ethers");

// Connect to the user's MetaMask wallet
async function connectToMetaMask() {
  if (window.ethereum) {
    try {
      // Request access to the user's MetaMask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a new ethers.js provider with the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // You're now connected to MetaMask, and you can use this provider for Ethereum-related operations
      console.log("Connected to MetaMask");
      return provider;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask not detected. Please install MetaMask.");
  }
}

// Call the connectToMetaMask function to establish the connection

let contract;
let provider;

connectToMetaMask().then(result=>{
    provider = result;
    contract = new ethers.Contract('0xB72E391eCbd96ead3EB2DE38dc7Be0E33d5a0d7e',details['abi'],provider);
    module.exports={
      contract,provider
    }
}).catch(err=>{
    console.log('Some error occured in recieving the provider');
    console.log(err);
});




