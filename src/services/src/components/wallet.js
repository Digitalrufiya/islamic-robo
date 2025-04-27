import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/dist/ethers.min.js";

const tokenAddress = '0x657f33094eD55c2864b0f9De0B11127e08165FAd';
const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export async function fetchTokenBalance(address, provider) {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
    const [balance, decimals] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals()
    ]);
    const formattedBalance = ethers.formatUnits(balance, decimals);
    document.getElementById('tokenBalance').innerText = `${formattedBalance} DRF`;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    document.getElementById('tokenBalance').innerText = 'Error fetching balance';
  }
}
