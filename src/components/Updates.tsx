import React, { useState } from 'react';

interface Update {
  id: string;
  campaignId: string;
  campaignTitle: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: 'milestone' | 'general' | 'urgent';
  imageUrl?: string;
}

interface UpdatesProps {
  className?: string;
}

export default function Updates({ className = '' }: UpdatesProps) {
  const [updates] = useState<Update[]>([
    {
      id: '1',
      campaignId: '1',
      campaignTitle: 'Help Build a School in Kenya',
      title: 'Foundation Work Completed!',
      content: 'We are excited to announce that the foundation work for the school has been completed ahead of schedule. The concrete foundation is now ready, and we are moving on to the next phase of construction.',
      author: 'Education Foundation Team',
      date: '2024-01-15',
      type: 'milestone',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
    },
    {
      id: '2',
      campaignId: '2',
      campaignTitle: 'Clean Water Initiative',
      title: 'First Water System Installed',
      content: 'The first water purification system has been successfully installed in the village of Mwamba. The community now has access to clean, safe drinking water for the first time in years.',
      author: 'Water for All',
      date: '2024-01-12',
      type: 'milestone',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
    },
    {
      id: '3',
      campaignId: '3',
      campaignTitle: 'Wildlife Conservation Project',
      title: 'Urgent: Additional Funding Needed',
      content: 'Due to unexpected challenges in the field, we need additional funding to complete the wildlife monitoring equipment installation. Every donation helps us protect these endangered species.',
      author: 'Wildlife Foundation',
      date: '2024-01-10',
      type: 'urgent',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    },
    {
      id: '4',
      campaignId: '1',
      campaignTitle: 'Help Build a School in Kenya',
      title: 'Thank You to Our Donors',
      content: 'We want to express our heartfelt gratitude to all our donors who have made this project possible. Your support is making a real difference in the lives of children in Kenya.',
      author: 'Education Foundation Team',
      date: '2024-01-08',
      type: 'general'
    },
    {
      id: '5',
      campaignId: '2',
      campaignTitle: 'Clean Water Initiative',
      title: 'Community Training Session',
      content: 'We conducted a comprehensive training session for community members on maintaining the water purification systems. The response was overwhelming, and the community is now self-sufficient in system maintenance.',
      author: 'Water for All',
      date: '2024-01-05',
      type: 'general'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'general':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return '🎯';
      case 'urgent':
        return '🚨';
      case 'general':
        return '📢';
      default:
        return '📝';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Updates</h1>
          <p className="text-gray-600">
            Stay informed about the latest progress from campaigns you care about
          </p>
        </div>

        <div className="space-y-6">
          {updates.map((update) => (
            <div
              key={update.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Update Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getTypeIcon(update.type)}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                          update.type
                        )}`}
                      >
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      From: <span className="font-medium">{update.campaignTitle}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {formatDate(update.date)}
                    </p>
                    <p className="text-xs text-gray-400">
                      by {update.author}
                    </p>
                  </div>
                </div>

                {/* Update Content */}
                <div className="mb-4">
                  {update.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={update.imageUrl}
                        alt={update.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <p className="text-gray-700 leading-relaxed">
                    {update.content}
                  </p>
                </div>

                {/* Update Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <span>👍</span>
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <span>💬</span>
                      <span className="text-sm">Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <span>📤</span>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    View Campaign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Load More Updates
          </button>
        </div>

        {/* Subscribe to Updates */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Stay Updated
          </h3>
          <p className="text-blue-800 mb-4">
            Subscribe to receive updates about campaigns you're interested in
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}