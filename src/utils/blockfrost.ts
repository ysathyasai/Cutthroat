import { BlockfrostProvider } from '@meshsdk/core';

// Initialize Blockfrost provider
export const blockfrostProvider = new BlockfrostProvider(
  process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || 'YOUR_BLOCKFROST_API_KEY'
);

// Helper function to get Blockfrost provider instance
export function getBlockfrostProvider(): BlockfrostProvider {
  return blockfrostProvider;
}

// Helper function to check if Blockfrost API key is configured
export function isBlockfrostConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY && 
           process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY !== 'YOUR_BLOCKFROST_API_KEY');
}

// Network configuration
export const NETWORK_CONFIG = {
  testnet: {
    id: 0,
    name: 'Testnet',
    explorer: 'https://preprod.cardanoscan.io'
  },
  mainnet: {
    id: 1,
    name: 'Mainnet',
    explorer: 'https://cardanoscan.io'
  }
};

// Get current network based on environment
export function getCurrentNetwork() {
  const isTestnet = process.env.NEXT_PUBLIC_NETWORK === 'testnet' || 
                   process.env.NODE_ENV === 'development';
  return isTestnet ? NETWORK_CONFIG.testnet : NETWORK_CONFIG.mainnet;
}

// Helper function to format ADA amounts
export function formatADA(lovelace: string | number): string {
  const ada = Number(lovelace) / 1_000_000;
  return ada.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
}

// Helper function to convert ADA to Lovelace
export function adaToLovelace(ada: number): string {
  return (ada * 1_000_000).toString();
}

// Helper function to get transaction explorer URL
export function getTransactionUrl(txHash: string): string {
  const network = getCurrentNetwork();
  return `${network.explorer}/transaction/${txHash}`;
}