import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return basic API information
    res.status(200).json({
      message: 'Cutthroat API is running',
      version: '1.0.0',
      endpoints: {
        'GET /api/hello': 'Health check endpoint',
        'POST /api/donation-metadata': 'Upload donation metadata to IPFS',
        'GET /api/campaigns': 'Get all campaigns',
        'POST /api/campaigns': 'Create new campaign',
        'GET /api/campaigns/[id]': 'Get specific campaign',
        'PUT /api/campaigns/[id]': 'Update campaign',
        'DELETE /api/campaigns/[id]': 'Delete campaign'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in hello API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}