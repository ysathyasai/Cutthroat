import React from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';

interface ConnectWalletProps {
  onConnected?: () => void;
}

export default function ConnectWallet({ onConnected }: ConnectWalletProps) {
  const { connected, wallet } = useWallet();

  React.useEffect(() => {
    if (connected && onConnected) {
      onConnected();
    }
  }, [connected, onConnected]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Connect Your Wallet</h2>
      <p className="text-sm text-gray-600 text-center">
        Connect your Cardano wallet to interact with the blockchain
      </p>
      
      <CardanoWallet 
        label="Connect Wallet"
        onConnected={onConnected}
      />
      
      {connected && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            ✅ Wallet connected successfully!
          </p>
        </div>
      )}
    </div>
  );
}