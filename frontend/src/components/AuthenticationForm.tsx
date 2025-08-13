import React from 'react';
import { useAuth } from '../lib/auth';

interface FormValues {
  email: string;
  password: string;
}

const AuthenticationForm = () => {
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthenticationForm;