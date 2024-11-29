import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        // Automatically connect if accounts are available
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          handleAccountsChanged(accounts);
        }

        // Listen for account changes
        window.ethereum.on("accountsChanged", handleAccountsChanged);
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
      }
    };

    init();
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
      setSigner(provider.getSigner());
    } else {
      setWalletAddress("");
      setSigner(null);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected account:", accounts[0]);
      // Save account or process further
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <Web3Context.Provider value={{ provider, signer, walletAddress, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
