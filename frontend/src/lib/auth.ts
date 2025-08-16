import React from 'react';
import { useState } from 'react';
import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationChallenge, setRegistrationChallenge] = useState('');
  const [authenticationChallenge, setAuthenticationChallenge] = useState('');

  const isWebAuthnSupported = async () => {
    return await browserSupportsWebAuthn();
  };

  const register = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register-passkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate registration options');
      }

      setRegistrationChallenge(data.challenge);
      const registration = await startRegistration(data.registrationOptions);

      const verificationResponse = await fetch('/api/auth/register-passkey/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          id: registration.id,
          rawId: registration.rawId,
          response: registration.response,
          type: registration.type,
          clientDataJSON: registration.clientDataJSON,
          attestationObject: registration.attestationObject,
          challenge: data.challenge,
        }),
      });

      const verificationData = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(verificationData.error || 'Failed to verify registration');
      }

      console.log('Registration successful');
    } catch (error: any) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login-passkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate authentication options');
      }

      setAuthenticationChallenge(data.challenge);
      const authentication = await startAuthentication(data.authenticationOptions);

      const verificationResponse = await fetch('/api/auth/login-passkey/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          id: authentication.id,
          rawId: authentication.rawId,
          response: authentication.response,
          type: authentication.type,
          clientDataJSON: authentication.clientDataJSON,
          authenticatorAttachment: authentication.authenticatorAttachment,
          challenge: data.challenge,
        }),
      });

      const verificationData = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(verificationData.error || 'Failed to verify authentication');
      }

      console.log('Login successful');
    } catch (error: any) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    register,
    isLoading,
    isWebAuthnSupported,
  };
};

export default useAuth;