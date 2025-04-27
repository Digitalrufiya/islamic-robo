import { Core } from "https://cdn.jsdelivr.net/npm/@walletconnect/core@2.8.5/dist/esm/index.js";
import { WalletKit } from "https://cdn.jsdelivr.net/npm/@reown/walletkit@1.0.6/dist/walletkit.module.js";
import { fetchTokenBalance } from './wallet.js';
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/dist/ethers.min.js";

let walletKit;
let provider;

const core = new Core({
  projectId: '5c53beb0cbc14bcf6d24f38c9bfb7560'
});

const metadata = {
  name: 'Digitalrufiya Wallet',
  description: 'DRF Wallet Example',
  url: 'https://reown.com/appkit',
  icons: ['https://assets.reown.com/reown-profile-pic.png']
};

async function initWalletKit() {
  walletKit = await WalletKit.init({
    core,
    metadata,
    requiredChains: [56] // Binance Smart Chain (BSC)
  });
}

async function connectWallet(isAutoReconnect = false) {
  try {
    if (!walletKit) {
      await initWalletKit();
    }
    const session = await walletKit.connect({
      autoConnectLastSession: isAutoReconnect
    });

    const accounts = session.accounts;
    const address = accounts[0];

    console.log('Connected account:', address);

    document.getElementById('userAddress').innerText = address;
    document.getElementById('walletInfo').style.display = 'block';
    document.getElementById('status').innerText = 'Wallet Connected!';

    if (!isAutoReconnect) {
      localStorage.setItem('walletConnected', 'true');
    }

    provider = new ethers.BrowserProvider(walletKit.getProvider());
    await fetchTokenBalance(address, provider);

  } catch (error) {
    console.error('Wallet connection failed:', error);
    document.getElementById('status').innerText = 'Connection failed. Please try again.';
    localStorage.removeItem('walletConnected');
  }
}

function copyAddress() {
  const address = document.getElementById('userAddress').innerText;
  navigator.clipboard.writeText(address).then(() => {
    alert('Wallet address copied to clipboard!');
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('connectButton').addEventListener('click', () => connectWallet(false));
  document.getElementById('userAddress').addEventListener('click', copyAddress);

  if (localStorage.getItem('walletConnected') === 'true') {
    console.log('Attempting auto reconnect...');
    await connectWallet(true);
  }
});
