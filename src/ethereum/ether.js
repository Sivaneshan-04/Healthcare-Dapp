const details = require('./build/Healthcare.json');
const { ethers } = require("ethers");

// // Connect to the user's MetaMask wallet
// async function connectToMetaMask() {
//   if (window.ethereum) {
//     try {
//       // Request access to the user's MetaMask wallet
//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       // Create a new ethers.js provider with the MetaMask provider
//       const provider = new ethers.providers.Web3Provider(window.ethereum);

//       // You're now connected to MetaMask, and you can use this provider for Ethereum-related operations
    
//       const signer = new ethers.Wallet('82d2b31ddaad578519384f74d6aa48f8375de997c056228efb01cc1ff4636e45',provider);
//       console.log("Connected to MetaMask");
//       return signer;
//     } catch (error) {
//       console.error("Error connecting to MetaMask:", error);
//     }
//   } else {
//     console.error("MetaMask not detected. Please install MetaMask.");
//   }
// }

// // Call the connectToMetaMask function to establish the connection

// let contract;
// let provider;

// connectToMetaMask().then(result=>{
//     provider = result;
//     contract = new ethers.Contract('0xf3D8ACA683667d4Bf13de2Df4db9777e1AE07c1B',details['abi'],provider);
//     module.exports={
//       contract,provider
//     }
// }).catch(err=>{
//     console.log('Some error occured in recieving the provider');
//     console.log(err);
// });

const ethereum = window.ethereum;
// let signer;
let contract;

if(ethereum){
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(ethereum)
  const walletAddress = accounts[0]    // first account in MetaMask
  const signer = provider.getSigner(walletAddress)
  contract = new ethers.Contract('0x56de18C0397904Eb4C3a3DCE2de765cf6De1a63C',details['abi'],signer);
}
else{
  console.log('Metamask is missing');
}
export default contract;