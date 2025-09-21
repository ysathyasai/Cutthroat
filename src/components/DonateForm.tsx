import React, { useState } from 'react';
import { useWallet } from '@meshsdk/react';
import { Transaction, BlockfrostProvider } from '@meshsdk/core';

interface DonateFormProps {
  campaignId?: string;
  campaignTitle?: string;
  className?: string;
}

export default function DonateForm({ 
  campaignId, 
  campaignTitle, 
  className = '' 
}: DonateFormProps) {
  const { connected, wallet } = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Predefined donation amounts
  const quickAmounts = [5, 10, 25, 50, 100];

  const handleDonation = async () => {
    if (!connected || !wallet) {
      setError('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
      const lovelaceAmount = (parseFloat(amount) * 1_000_000).toString();

      // Create transaction
      const tx = new Transaction({ initiator: wallet })
        .sendLovelace(
          'addr_test1qp2k7wnshzngpqw0xmy33hvexw4aeg60yr79x3yeeqt3s2uvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysdp6yv3', // Campaign address
          lovelaceAmount
        );

      // Build, sign, and submit transaction
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setSuccess(`Donation successful! Transaction hash: ${txHash}`);
      setAmount('');
      setMessage('');
    } catch (err: any) {
      setError(err?.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {campaignTitle ? `Donate to ${campaignTitle}` : 'Make a Donation'}
      </h2>

      {!connected && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            Please connect your wallet to make a donation
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Donation Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount (ADA)
          </label>
          
          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleQuickAmount(quickAmount)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {quickAmount} ADA
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter custom amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.1"
            disabled={!connected}
          />
        </div>

        {/* Donation Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message with your donation..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!connected}
          />
        </div>

        {/* Campaign ID (if provided) */}
        {campaignId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign ID
            </label>
            <input
              type="text"
              value={campaignId}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Donate Button */}
        <button
          onClick={handleDonation}
          disabled={!connected || loading || !amount}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            connected && !loading && amount
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>

        {/* Donation Info */}
        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Donation Information:</h4>
          <ul className="space-y-1">
            <li>• Donations are processed on the Cardano blockchain</li>
            <li>• Transaction fees apply (typically 0.17 ADA)</li>
            <li>• You'll receive a transaction hash as confirmation</li>
            <li>• All donations are transparent and verifiable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}