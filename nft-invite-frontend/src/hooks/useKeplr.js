import { useState } from "react";

export const useKeplr = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert("Keplr extension not found!");
      return;
    }

    const chainId = "stargaze-1";

    try {
      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
      return accounts[0].address;
    } catch (err) {
      console.error("Keplr connect error", err);
    }
  };

  return { walletAddress, connectKeplr };
};
