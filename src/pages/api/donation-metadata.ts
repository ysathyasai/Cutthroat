import { NextApiRequest, NextApiResponse } from 'next';
import { uploadDonationMetadata } from '@/utils/ipfs';

interface DonationMetadata {
  campaignId: string;
  amount: number;
  donorAddress: string;
  message?: string;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { campaignId, amount, donorAddress, message } = req.body;

    // Validate required fields
    if (!campaignId || !amount || !donorAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields: campaignId, amount, donorAddress' 
      });
    }

    // Create donation metadata
    const donationMetadata: DonationMetadata = {
      campaignId,
      amount: Number(amount),
      donorAddress,
      message: message || '',
      timestamp: new Date().toISOString()
    };

    // Upload to IPFS
    const ipfsHash = await uploadDonationMetadata(donationMetadata);

    if (!ipfsHash) {
      return res.status(500).json({ error: 'Failed to upload metadata to IPFS' });
    }

    // Return success response
    res.status(200).json({
      success: true,
      ipfsHash,
      metadata: donationMetadata
    });

  } catch (error) {
    console.error('Error processing donation metadata:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}