// backend/src/lib/auth.ts

import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { prisma } from '../../../lib/prisma';
import { base64ToBuffer } from '../../../lib/crypto';
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/typescript-types';

export async function registerPasskey(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const existingCredentials = await prisma.credential.findMany({
    where: {
      userId: user.id,
    },
  });

  const options = await generateRegistrationOptions({
    rpName: 'Legaci',
    rpID: 'localhost', // TODO: Change this to the actual domain
    userID: user.id,
    userName: email,
    attestationType: 'none',
    excludeCredentials: existingCredentials.map((cred) => ({
      id: base64ToBuffer(cred.webauthnCredentialId),
      type: 'public-key',
      transports: [],
    })),
  });

  return options;
}

export async function verifyPasskeyRegistration(
  email: string,
  registration: any,
  challenge: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { verified, registrationInfo } = await verifyRegistrationResponse(
    {
      response: registration as RegistrationResponseJSON,
      expectedChallenge: challenge,
      expectedOrigin: `http://localhost:3000`, // TODO: Change this to the actual origin
      expectedRPID: 'localhost', // TODO: Change this to the actual domain
    }
  );

  if (verified && registrationInfo) {
    const credentialPublicKey = registrationInfo.credentialPublicKey;
    const credentialID = registrationInfo.credentialID;
    const counter = registrationInfo.counter;

    await prisma.credential.create({
      data: {
        userId: user.id,
        webauthnCredentialId: credentialID,
        publicKey: credentialPublicKey,
        signCount: counter,
      },
    });

    return { success: true };
  }

  return { success: false, error: 'Failed to verify registration' };
}


export async function loginPasskey(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const existingCredentials = await prisma.credential.findMany({
    where: {
      userId: user.id,
    },
  });

  const options = await generateAuthenticationOptions({
  rpID: "localhost",
  allowCredentials: existingCredentials.map((cred) => ({
    id: base64ToBuffer(cred.webauthnCredentialId),
    type: 'public-key',
    transports: [],
  })),
  userVerification: 'discouraged',
});

  return options;
}

export async function verifyPasskeyLogin(
  email: string,
  authentication: any,
  challenge: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const credential = await prisma.credential.findFirst({
    where: {
      userId: user.id,
      webauthnCredentialId: authentication.id,
    },
  });

  if (!credential) {
    throw new Error('Credential not found');
  }

  const { verified, authenticationInfo } = await verifyAuthenticationResponse(
    {
      response: authentication as AuthenticationResponseJSON,
      expectedChallenge: challenge,
      expectedOrigin: `http://localhost:3000`, // TODO: Change this to the actual origin
      expectedRPID: 'localhost', // TODO: Change this to the actual domain
      authenticator: {
        credentialPublicKey: credential.publicKey,
        credentialID: credential.webauthnCredentialId,
        counter: credential.signCount,
      },
    }
  );

  if (verified && authenticationInfo) {
    await prisma.credential.update({
      where: {
        id: credential.id,
      },
      data: {
        signCount: authenticationInfo.newCounter,
      },
    });

    return { success: true };
  }

  return { success: false, error: 'Failed to verify authentication' };
}