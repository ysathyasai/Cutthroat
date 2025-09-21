import React, { useState } from 'react';
import { useWallet } from '@meshsdk/react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  creator: string;
  imageUrl?: string;
}

interface CampaignsProps {
  className?: string;
}

export default function Campaigns({ className = '' }: CampaignsProps) {
  const { connected } = useWallet();
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Help Build a School in Kenya',
      description: 'Supporting education infrastructure in rural Kenya to provide quality education for children.',
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: '2024-12-31',
      creator: 'Education Foundation',
      imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400'
    },
    {
      id: '2',
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems in communities without access to clean drinking water.',
      targetAmount: 30000,
      currentAmount: 15000,
      deadline: '2024-11-30',
      creator: 'Water for All',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
    },
    {
      id: '3',
      title: 'Wildlife Conservation Project',
      description: 'Protecting endangered species and their habitats through conservation efforts.',
      targetAmount: 75000,
      currentAmount: 40000,
      deadline: '2025-01-15',
      creator: 'Wildlife Foundation',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">
            Discover and support meaningful causes on the Cardano blockchain
          </p>
        </div>

        {!connected && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Please connect your wallet to participate in campaigns
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {campaign.imageUrl && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {campaign.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getProgressPercentage(campaign.currentAmount, campaign.targetAmount).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(campaign.currentAmount, campaign.targetAmount)}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Raised</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(campaign.currentAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(campaign.targetAmount)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Days Left</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {getDaysRemaining(campaign.deadline)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Creator</p>
                    <p className="text-sm font-medium text-gray-900">
                      {campaign.creator}
                    </p>
                  </div>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    connected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!connected}
                >
                  {connected ? 'Donate Now' : 'Connect Wallet to Donate'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Load More Campaigns
          </button>
        </div>
      </div>
    </div>
  );
}