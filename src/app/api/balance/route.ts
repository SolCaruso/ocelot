import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// RPC endpoints with fallbacks
const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://solana-mainnet.g.alchemy.com/v2/demo'
];

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, tokenAddress, decimals } = await request.json();
    
    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    const publicKey = new PublicKey(walletAddress);
    let balance = 0;

    // Try each RPC endpoint
    for (const rpcUrl of RPC_ENDPOINTS) {
      try {
        console.log(`Trying RPC endpoint: ${rpcUrl}`);
        const connection = new Connection(rpcUrl, 'confirmed');
        
        if (tokenAddress === 'So11111111111111111111111111111111111111112') {
          // SOL balance
          const lamports = await connection.getBalance(publicKey);
          balance = lamports / LAMPORTS_PER_SOL;
          console.log(`SOL balance: ${balance}`);
        } else {
          // SPL token balance
          const response = await connection.getTokenAccountsByOwner(publicKey, {
            mint: new PublicKey(tokenAddress)
          });
          
          if (response.value.length > 0) {
            const accountInfo = await connection.getAccountInfo(response.value[0].pubkey);
            if (accountInfo && accountInfo.data.length >= 72) {
              const data = accountInfo.data;
              const amount = data.readBigUInt64LE(64);
              balance = Number(amount) / (10 ** decimals);
              console.log(`SPL token balance: ${balance}`);
            }
          }
        }
        
        // Success - return the balance
        return NextResponse.json({ 
          balance,
          rpcEndpoint: rpcUrl,
          success: true 
        });
        
      } catch (error) {
        console.log(`Failed to fetch from ${rpcUrl}:`, error);
        continue; // Try next endpoint
      }
    }
    
    // All endpoints failed
    return NextResponse.json({ 
      error: 'All RPC endpoints failed',
      balance: 0 
    }, { status: 500 });
    
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      balance: 0 
    }, { status: 500 });
  }
} 