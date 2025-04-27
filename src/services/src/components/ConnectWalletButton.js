import React from 'react';
import { connectWallet } from '../services/walletService';

export default function ConnectWalletButton({ setAccount }) {
  const handleConnect = async () => {
    const account = await connectWallet();
    setAccount(account);
  };

  return (
    <button onClick={handleConnect}>
      Connect Wallet
    </button>
  );
}
