import { 
  MeshWallet, 
  Transaction, 
  ForgeScript, 
  resolveScriptHash,
  resolvePaymentKeyHash,
  stringToHex 
} from '@meshsdk/core';
import type { NativeScript, AssetMetadata } from '@meshsdk/core';

// NFT metadata interface
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  mediaType: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

// Campaign NFT metadata
export interface CampaignNFTMetadata extends NFTMetadata {
  campaignId: string;
  campaignName: string;
  donationAmount: number;
  donorAddress: string;
  timestamp: string;
}

// Generate NFT metadata for campaign donations
export function generateCampaignNFTMetadata(
  campaignId: string,
  campaignName: string,
  donationAmount: number,
  donorAddress: string
): CampaignNFTMetadata {
  return {
    name: `Donation NFT - ${campaignName}`,
    description: `This NFT represents a donation of ${donationAmount} ADA to the campaign "${campaignName}".`,
    image: 'ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ', // Default image
    mediaType: 'image/png',
    campaignId,
    campaignName,
    donationAmount,
    donorAddress,
    timestamp: new Date().toISOString(),
    attributes: [
      {
        trait_type: 'Campaign',
        value: campaignName
      },
      {
        trait_type: 'Donation Amount',
        value: donationAmount
      },
      {
        trait_type: 'Donation Date',
        value: new Date().toLocaleDateString()
      }
    ]
  };
}

// Create a native script for minting NFTs
export function createMintingScript(walletAddress: string): {
  nativeScript: NativeScript;
  forgeScript: ForgeScript;
  policyId: string;
} {
  const pubKeyHash = resolvePaymentKeyHash(walletAddress);
  
  const nativeScript: NativeScript = {
    type: 'all',
    scripts: [
      {
        type: 'before',
        slot: '90000000' // Expiration slot
      },
      {
        type: 'sig',
        keyHash: pubKeyHash
      }
    ]
  };

  const forgeScript = ForgeScript.fromNativeScript(nativeScript);
  const policyId = resolveScriptHash(forgeScript);

  return {
    nativeScript,
    forgeScript,
    policyId
  };
}

// Mint NFT for donation
export async function mintDonationNFT(
  wallet: MeshWallet,
  campaignId: string,
  campaignName: string,
  donationAmount: number,
  donorAddress: string
): Promise<string | null> {
  try {
    const walletAddress = await wallet.getChangeAddress();
    const { forgeScript, policyId } = createMintingScript(walletAddress);
    
    // Generate unique asset name
    const timestamp = Date.now();
    const assetName = `DONATION_${campaignId}_${timestamp}`;
    const assetNameHex = stringToHex(assetName);
    
    // Generate metadata
    const metadata = generateCampaignNFTMetadata(
      campaignId,
      campaignName,
      donationAmount,
      donorAddress
    );

    // Create transaction
    const tx = new Transaction({ initiator: wallet })
      .mintAsset(
        forgeScript,
        {
          assetName: assetNameHex,
          assetQuantity: '1',
          metadata: metadata,
          label: '721',
          recipient: donorAddress
        }
      );

    // Build, sign, and submit transaction
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  } catch (error) {
    console.error('Failed to mint donation NFT:', error);
    return null;
  }
}

// Verify NFT ownership
export async function verifyNFTOwnership(
  wallet: MeshWallet,
  policyId: string,
  assetName: string
): Promise<boolean> {
  try {
    const assets = await wallet.getAssets();
    const fullAssetName = policyId + assetName;
    
    return assets.some(asset => asset.unit === fullAssetName);
  } catch (error) {
    console.error('Failed to verify NFT ownership:', error);
    return false;
  }
}

// Get NFT metadata from blockchain
export async function getNFTMetadata(
  policyId: string,
  assetName: string
): Promise<NFTMetadata | null> {
  try {
    // This would typically involve querying the blockchain for metadata
    // For now, we'll return a placeholder
    return {
      name: 'Campaign Donation NFT',
      description: 'NFT representing a donation to a campaign',
      image: 'ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ',
      mediaType: 'image/png'
    };
  } catch (error) {
    console.error('Failed to get NFT metadata:', error);
    return null;
  }
}

// Utility function to format asset names
export function formatAssetName(assetName: string): string {
  try {
    // Convert hex to string
    return Buffer.from(assetName, 'hex').toString('utf8');
  } catch {
    return assetName;
  }
}

// Utility function to get asset display name
export function getAssetDisplayName(unit: string): string {
  if (unit === 'lovelace') {
    return 'ADA';
  }
  
  // Extract policy ID and asset name
  const policyId = unit.slice(0, 56);
  const assetName = unit.slice(56);
  
  try {
    const decodedName = formatAssetName(assetName);
    return decodedName || assetName;
  } catch {
    return assetName;
  }
}