import React, { useState, useEffect } from 'react';
import { useWallet, useAssets, useLovelace } from '@meshsdk/react';

interface DashboardProps {
  className?: string;
}

export default function Dashboard({ className = '' }: DashboardProps) {
  const { connected, wallet } = useWallet();
  const assets = useAssets();
  const lovelace = useLovelace();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getAssets = async () => {
    if (wallet) {
      setLoading(true);
      setError('');
      try {
        const _assets = await wallet.getAssets();
        console.log('Wallet assets:', _assets);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (connected) {
      getAssets();
    }
  }, [connected]);

  if (!connected) {
    return (
      <div className={`p-6 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-600 text-center">
          Please connect your wallet to view your dashboard
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wallet Dashboard</h2>
      
      {/* Balance Section */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">ADA Balance</h3>
        <p className="text-2xl font-mono text-blue-900">
          {lovelace ? (Number(lovelace) / 1_000_000).toLocaleString() : '0'} ADA
        </p>
      </div>

      {/* Assets Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Assets</h3>
          <button
            onClick={getAssets}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Refresh Assets'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          {!assets || assets.length === 0 ? (
            <p className="text-gray-600 text-center">No assets found</p>
          ) : (
            <div className="space-y-2">
              {assets
                .filter((asset) => asset.unit !== 'lovelace')
                .map((asset) => (
                  <div
                    key={asset.unit}
                    className="flex justify-between items-center p-3 bg-white rounded border"
                  >
                    <div>
                      <p className="font-mono text-sm text-gray-800">
                        {asset.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        Policy ID: {asset.unit.slice(0, 56)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {asset.quantity}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Wallet Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Wallet Information</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Status:</span>{' '}
            <span className="text-green-600">Connected</span>
          </p>
          <p>
            <span className="font-medium">Total Assets:</span>{' '}
            {assets ? assets.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
}