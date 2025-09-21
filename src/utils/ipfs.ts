import { create } from 'ipfs-http-client';

// IPFS configuration
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
const IPFS_API_URL = process.env.NEXT_PUBLIC_IPFS_API_URL || 'https://ipfs.infura.io:5001';

// Initialize IPFS client
let ipfsClient: any = null;

export function getIPFSClient() {
  if (!ipfsClient) {
    try {
      ipfsClient = create({
        url: IPFS_API_URL,
        headers: {
          authorization: process.env.NEXT_PUBLIC_IPFS_AUTH || ''
        }
      });
    } catch (error) {
      console.error('Failed to initialize IPFS client:', error);
      return null;
    }
  }
  return ipfsClient;
}

// Upload file to IPFS
export async function uploadToIPFS(file: File): Promise<string | null> {
  try {
    const client = getIPFSClient();
    if (!client) {
      throw new Error('IPFS client not available');
    }

    const result = await client.add(file);
    return result.path;
  } catch (error) {
    console.error('Failed to upload to IPFS:', error);
    return null;
  }
}

// Upload JSON data to IPFS
export async function uploadJSONToIPFS(data: any): Promise<string | null> {
  try {
    const client = getIPFSClient();
    if (!client) {
      throw new Error('IPFS client not available');
    }

    const jsonString = JSON.stringify(data);
    const result = await client.add(jsonString);
    return result.path;
  } catch (error) {
    console.error('Failed to upload JSON to IPFS:', error);
    return null;
  }
}

// Get IPFS URL
export function getIPFSUrl(hash: string): string {
  return `${IPFS_GATEWAY}${hash}`;
}

// Upload campaign metadata to IPFS
export async function uploadCampaignMetadata(metadata: {
  name: string;
  description: string;
  image?: string;
  category: string;
  targetAmount: number;
  deadline: string;
  creator: string;
}): Promise<string | null> {
  const ipfsMetadata = {
    name: metadata.name,
    description: metadata.description,
    image: metadata.image || '',
    category: metadata.category,
    targetAmount: metadata.targetAmount,
    deadline: metadata.deadline,
    creator: metadata.creator,
    version: '1.0',
    timestamp: new Date().toISOString()
  };

  return await uploadJSONToIPFS(ipfsMetadata);
}

// Upload donation metadata to IPFS
export async function uploadDonationMetadata(metadata: {
  campaignId: string;
  amount: number;
  donorAddress: string;
  message?: string;
  timestamp: string;
}): Promise<string | null> {
  const ipfsMetadata = {
    campaignId: metadata.campaignId,
    amount: metadata.amount,
    donorAddress: metadata.donorAddress,
    message: metadata.message || '',
    timestamp: metadata.timestamp,
    version: '1.0'
  };

  return await uploadJSONToIPFS(ipfsMetadata);
}

// Fetch data from IPFS
export async function fetchFromIPFS(hash: string): Promise<any | null> {
  try {
    const response = await fetch(getIPFSUrl(hash));
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch from IPFS:', error);
    return null;
  }
}