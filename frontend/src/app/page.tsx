// Import necessary dependencies
import React, { useState } from 'react';
import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DiscoBall from '../components/DiscoBall';

// Define the Home component
export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the backend to get authentication options
      const response = await fetch('/api/auth/login-passkey', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // In a real implementation, you would use the authenticationOptions to 
      // perform WebAuthn authentication using @simplewebauthn library
      // This is a placeholder for the actual WebAuthn implementation
       
      // For now, just simulate successful login
      console.log('Login successful');
      // In a real app, you would redirect or set authentication state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Head>
        <title>Legaci - Your story, in motion</title>
        <meta name="description" content="A personal AI assistant to model your personality and memories" />
      </Head>
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Welcome to Legaci</h1>
          <p className="text-lg text-center text-textSecondary">Your story, in motion</p>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-800 text-textPrimary rounded-md">
            {error}
          </div>
        )}

        <div className="mb-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-surface text-textPrimary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <button 
            className="bg-primary text-textPrimary px-4 py-2 rounded w-full"
            onClick={handleLogin}
            disabled={loading || !email}
          >
            {loading ? 'Authenticating...' : 'Login with Passkey'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left panel for agent chat */}
          <div className="w-full md:w-1/3 bg-surface p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Agent Chat</h2>
            <p className="text-textSecondary mb-4">Interactive chat with AI to fill gaps in your personality profile.</p>
            {/* Placeholder for chat component */}
            <div className="h-64 bg-surface rounded p-4">
              <p className="text-center">Chat interface will be implemented here</p>
            </div>
          </div>
          {/* Center section for the 3D disco ball */}
          <div className="w-full md:w-3/5 flex justify-center items-center bg-surface p-4 rounded-lg">
            <Canvas>
              <DiscoBall />
            </Canvas>
          </div>
          {/* Right panel for inspector */}
          <div className="w-full md:w-1/3 bg-surface p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Inspector</h2>
            <p className="text-textSecondary mb-4">Detailed view of selected traits and actions.</p>
            {/* Placeholder for inspector component */}
            <div className="h-64 bg-surface rounded p-4">
              <p className="text-center">Inspector panel will be implemented here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}