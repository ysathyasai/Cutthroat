
import React, { useState } from 'react';
import { useWallet } from '@meshsdk/react';
import Navigation from '@/components/Navigation';
import ConnectWallet from '@/components/ConnectWallet';
import Dashboard from '@/components/Dashboard';
import Campaigns from '@/components/Campaigns';
import DonateForm from '@/components/DonateForm';

export default function Home() {
  const { connected } = useWallet();
  const [showDonateForm, setShowDonateForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Cutthroat
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A decentralized platform for transparent and secure donations on Cardano
          </p>
          
          {!connected && (
            <div className="max-w-md mx-auto">
              <ConnectWallet />
            </div>
          )}
        </div>

        {/* Main Content */}
        {connected ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dashboard */}
            <div className="lg:col-span-1">
              <Dashboard />
            </div>

            {/* Campaigns and Donation Form */}
            <div className="lg:col-span-2 space-y-8">
              <Campaigns />
              
              {showDonateForm && (
                <DonateForm 
                  campaignId="sample-campaign"
                  campaignTitle="Sample Campaign"
                />
              )}
              
              <div className="text-center">
                <button
                  onClick={() => setShowDonateForm(!showDonateForm)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showDonateForm ? 'Hide Donation Form' : 'Show Donation Form'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your Cardano wallet to start donating to causes you care about.
                All transactions are transparent and verifiable on the blockchain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="text-3xl mb-4">🔗</div>
                  <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                  <p className="text-gray-600 text-sm">
                    Securely connect your Cardano wallet to the platform
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold mb-2">Browse Campaigns</h3>
                  <p className="text-gray-600 text-sm">
                    Discover meaningful causes and campaigns to support
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="text-3xl mb-4">💝</div>
                  <h3 className="text-lg font-semibold mb-2">Make Donations</h3>
                  <p className="text-gray-600 text-sm">
                    Donate ADA directly to campaigns with full transparency
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
