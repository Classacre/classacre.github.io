import React from 'react';
import { useAuth } from '../lib/auth';

interface FormValues {
  email: string;
}

const AuthenticationForm = () => {
  const { signIn, register, isLoading, isWebAuthnSupported } = useAuth();
  const [email, setEmail] = React.useState('');

  const handleRegister = async () => {
    try {
      await register(email);
    } catch (error) {
      console.error('Passkey registration failed:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email);
    } catch (error) {
      console.error('Passkey sign-in failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4">
        <label className="block text-textPrimary text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-textPrimary leading-tight focus:outline-none focus:shadow-outline bg-surface"
        />
      </div>
      <button
        type="button"
        onClick={handleRegister}
        disabled={isLoading || !isWebAuthnSupported()}
        className="bg-primary hover:bg-primary-700 text-textPrimary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isLoading ? 'Registering...' : 'Register with Passkey'}
      </button>
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading || !isWebAuthnSupported()}
        className="bg-accent hover:bg-accent-700 text-textPrimary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mt-4"
      >
        {isLoading ? 'Signing In...' : 'Sign In with Passkey'}
      </button>
      {!isWebAuthnSupported() && (
        <p className="text-textSecondary mt-4">WebAuthn is not supported in this browser.</p>
      )}
    </div>
  );
};

export default AuthenticationForm;