import { ethers } from 'ethers';

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('User rejected request');
      throw error;
    }
  } else {
    alert('Please install MetaMask!');
    return null;
  }
}
