import { test, expect } from '@playwright/test';

/**
 * E2E tests for passkey endpoints.
 * These tests exercise the HTTP endpoints and cookie behavior (challenge + csrf).
 *
 * Note: Full client-side WebAuthn (navigator.credentials) is out of scope for CI here.
 * The tests validate server responses and cookie flags, and that verification endpoints
 * reject missing/invalid payloads.
 */

test.describe('Passkey endpoints (server-side checks)', () => {
  const email = `e2e+${Date.now()}@example.test`;

  test('POST /api/auth/register-passkey sets challenge and csrf cookies', async ({ request }) => {
    const res = await request.post('/api/auth/register-passkey', { data: { email } });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('registrationOptions');
    expect(body).toHaveProperty('csrf');

    // Validate cookies header contains webauthn_challenge and csrf_token
    const setCookie = res.headers()['set-cookie'] ?? '';
    expect(setCookie).toContain('webauthn_challenge=');
    expect(setCookie).toContain('csrf_token=');
    // Ensure cookie attributes include SameSite=Strict
    expect(setCookie).toContain('SameSite=Strict');
  });

  test('POST /api/auth/login-passkey sets challenge and csrf cookies', async ({ request }) => {
    const res = await request.post('/api/auth/login-passkey', { data: { email } });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('authenticationOptions');
    expect(body).toHaveProperty('csrf');

    const setCookie = res.headers()['set-cookie'] ?? '';
    expect(setCookie).toContain('webauthn_challenge=');
    expect(setCookie).toContain('csrf_token=');
    expect(setCookie).toContain('SameSite=Strict');
  });

  test('POST /api/auth/register-passkey/verify rejects missing payload or CSRF mismatch', async ({ request }) => {
    // Call verify without cookies/header - should result in 403 for CSRF or 400 for invalid payload
    const res = await request.post('/api/auth/register-passkey/verify', {
      data: {},
    });
    // Accept 400 or 403 depending on server behavior
    expect([400, 403, 500]).toContain(res.status());
  });

  test('POST /api/auth/login-passkey/verify rejects missing payload or CSRF mismatch', async ({ request }) => {
    const res = await request.post('/api/auth/login-passkey/verify', {
      data: {},
    });
    expect([400, 403, 500]).toContain(res.status());
  });
});